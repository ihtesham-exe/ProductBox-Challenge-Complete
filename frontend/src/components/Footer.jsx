const FooterItem = ({ text, link }) => {
  return (
    <li>
      <a href={link}>{text}</a>
    </li>
  );
};

const footerItems = [
  {
    id: 1,
    text: "Term of services",
    link: "#",
  },
  {
    id: 2,
    text: "Company",
    link: "#",
  },
];

const FooterBlock = () => {
  return (
    <footer className="mt-auto">
      <div className="bg-gray-200 dark:bg-gray-900 px-4 sm:px-10 md:px-12 lg:px-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row sm:justify-between items-center gap-y-5 py-6 border-t border-t-gray-300 dark:border-t-gray-700">
          <p className="text-gray-700 dark:text-gray-300">
            © 2025 ProductBox. Allrights reserved
          </p>
          <nav>
            <ul className="flex items-center gap-x-5 text-gray-800 dark:text-gray-200">
              {footerItems.map((footerItem) => (
                <FooterItem key={footerItem.id} {...footerItem} />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default FooterBlock;
