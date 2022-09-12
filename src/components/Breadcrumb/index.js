import Link from 'next/link';

const Breadcrumb = ({ BreadcrumbData }) => {
  console.log(BreadcrumbData);
  return (
    <nav
      aria-label="Breadcrumb"
      className="w-full border-b border-gray-200 breadcrumb bg-gray-50"
    >
      <div className="container p-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <ol className="flex items-stretch gap-2 text-sm list-none">
          <li className="flex items-center gap-2">
            <Link href="/">
              <a className="flex max-w-[20ch] items-center gap-1 truncate whitespace-nowrap text-xs text-gray-500 transition-colors hover:text-red-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  aria-labelledby="title-01 description-01"
                  role="link"
                >
                  <title id="title-01">Pagina inicial</title>
                  <desc id="description-01">Link para pagina inicial</desc>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </a>
            </Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="flex-none w-3 h-3 transition-transform stroke-slate-700 md:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              aria-labelledby="title-02 description-02"
              role="graphics-symbol"
            >
              <title id="title-02">Arrow</title>
              <desc id="description-02">
                Arrow icon that points to the next page in big screen resolution
                sizes and previous page in small screen resolution sizes.
              </desc>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </li>
          {BreadcrumbData &&
            BreadcrumbData.map((breadcrumb, index) => (
              <li className="flex items-center gap-2" key={breadcrumb.title}>
                {breadcrumb.href ? (
                  <Link href={breadcrumb.href}>
                    <a
                      className={`flex max-w-[20ch] items-center gap-1 truncate whitespace-nowrap text-xs transition-colors ${
                        index === BreadcrumbData.length - 1
                          ? 'text-slate-400'
                          : 'text-gray-500 hover:text-red-600'
                      }`}
                    >
                      {breadcrumb.title}
                    </a>
                  </Link>
                ) : (
                  <span
                    className={`flex max-w-[20ch] items-center gap-1 truncate whitespace-nowrap text-xs transition-colors ${
                      index === BreadcrumbData.length - 1
                        ? 'text-slate-400'
                        : 'text-gray-500 hover:text-red-600'
                    }`}
                  >
                    {breadcrumb.title}
                  </span>
                )}
                {index !== BreadcrumbData.length - 1 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-none w-3 h-3 transition-transform stroke-slate-700 md:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                    aria-labelledby={`title-` + index + ` description-` + index}
                    role="graphics-symbol"
                  >
                    <title id={`title-` + index}>{breadcrumb.title}</title>
                    <desc id={`description-` + index}>{breadcrumb.title}</desc>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                )}
              </li>
            ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
