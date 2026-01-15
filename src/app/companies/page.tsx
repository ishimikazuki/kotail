import Link from "next/link";
import Header from "@/components/Header";
import { getAllCompanies } from "@backend/services/companyService";

interface CompaniesPageProps {
  searchParams?: {
    name?: string | string[];
    industry?: string | string[];
    prefecture?: string | string[];
  };
}

const prefectures = [
  "北海道",
  "青森県",
  "岩手県",
  "宮城県",
  "秋田県",
  "山形県",
  "福島県",
  "茨城県",
  "栃木県",
  "群馬県",
  "埼玉県",
  "千葉県",
  "東京都",
  "神奈川県",
  "新潟県",
  "富山県",
  "石川県",
  "福井県",
  "山梨県",
  "長野県",
  "岐阜県",
  "静岡県",
  "愛知県",
  "三重県",
  "滋賀県",
  "京都府",
  "大阪府",
  "兵庫県",
  "奈良県",
  "和歌山県",
  "鳥取県",
  "島根県",
  "岡山県",
  "広島県",
  "山口県",
  "徳島県",
  "香川県",
  "愛媛県",
  "高知県",
  "福岡県",
  "佐賀県",
  "長崎県",
  "熊本県",
  "大分県",
  "宮崎県",
  "鹿児島県",
  "沖縄県",
];

const getParamValue = (value?: string | string[]) =>
  typeof value === "string" ? value.trim() : "";

const getPrefecture = (address?: string | null) => {
  if (!address) return "";
  const matched = prefectures.find((pref) => address.startsWith(pref));
  return matched ?? "";
};

export default async function CompaniesPage({
  searchParams,
}: CompaniesPageProps) {
  const companies = await getAllCompanies();

  const nameQuery = getParamValue(searchParams?.name);
  const industryQuery = getParamValue(searchParams?.industry);
  const prefectureQuery = getParamValue(searchParams?.prefecture);

  const industries = Array.from(
    new Set(
      companies
        .map((company) => company.business?.trim())
        .filter((value): value is string => Boolean(value))
    )
  ).sort((a, b) => a.localeCompare(b, "ja"));

  const availablePrefectures = Array.from(
    new Set(
      companies
        .map((company) => getPrefecture(company.address))
        .filter((value) => value)
    )
  );

  const filteredCompanies = companies.filter((company) => {
    const target = `${company.name ?? ""} ${company.business ?? ""} ${
      company.address ?? ""
    }`;
    const matchesName = nameQuery
      ? target.toLowerCase().includes(nameQuery.toLowerCase())
      : true;
    const matchesIndustry = industryQuery
      ? company.business === industryQuery
      : true;
    const matchesPrefecture = prefectureQuery
      ? getPrefecture(company.address) === prefectureQuery
      : true;

    return matchesName && matchesIndustry && matchesPrefecture;
  });

  const showCount = filteredCompanies.length;
  const rangeLabel = showCount === 0 ? "0件" : `1-${showCount}件`;

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          <Link href="/" className="hover:text-[#00a0e9]">
            ホーム
          </Link>
          <span className="px-2">/</span>
          <span className="text-gray-700">企業検索</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <aside>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-800 mb-4">
                企業口コミ・回答検索
              </h2>
              <form action="/companies" method="get" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500">
                    企業名
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={nameQuery}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-[#00a0e9] focus:outline-none focus:ring-2 focus:ring-[#00a0e9]/30"
                    placeholder="企業名を入力"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500">
                    業種
                  </label>
                  <select
                    name="industry"
                    defaultValue={industryQuery}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-[#00a0e9] focus:outline-none focus:ring-2 focus:ring-[#00a0e9]/30"
                  >
                    <option value="">選択してください</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500">
                    都道府県
                  </label>
                  <select
                    name="prefecture"
                    defaultValue={prefectureQuery}
                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-[#00a0e9] focus:outline-none focus:ring-2 focus:ring-[#00a0e9]/30"
                  >
                    <option value="">選択してください</option>
                    {prefectures
                      .filter((pref) =>
                        availablePrefectures.length
                          ? availablePrefectures.includes(pref)
                          : true
                      )
                      .map((pref) => (
                        <option key={pref} value={pref}>
                          {pref}
                        </option>
                      ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-full bg-[#00a0e9] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0088c7]"
                >
                  企業を探す
                </button>
              </form>
            </div>
          </aside>

          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  企業一覧（{showCount}件）
                </h1>
              </div>
              <span className="text-sm text-gray-500">{rangeLabel}</span>
            </div>

            {showCount === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center text-gray-500">
                該当する企業が見つかりませんでした。
              </div>
            ) : (
              <div className="space-y-5">
                {filteredCompanies.map((company) => {
                  const prefecture = getPrefecture(company.address);
                  return (
                    <Link
                      key={company.id}
                      href={`/company/${company.id}`}
                      className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                    >
                      <div className="w-20 h-20 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden">
                        {company.hero_image_url ? (
                          <img
                            src={company.hero_image_url}
                            alt={`${company.name}のロゴ`}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-xl font-bold text-gray-400">
                            {company.name?.slice(0, 1) ?? "?"}
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 text-sm font-semibold text-[#0A6EA8]">
                          <span className="truncate">{company.name}</span>
                          <svg
                            className="w-4 h-4 text-[#0A6EA8]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                          {company.business && (
                            <span className="rounded-full border border-gray-200 px-2.5 py-1">
                              業種 {company.business}
                            </span>
                          )}
                          {prefecture && (
                            <span className="rounded-full border border-gray-200 px-2.5 py-1">
                              所在地 {prefecture}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
