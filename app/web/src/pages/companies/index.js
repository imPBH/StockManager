import CompanyCard from "@/components/company/CompanyCard"

export default function Companies() {
    const companies = [
        {
          name: 'Slack',
          logo: 'https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/SlackLogo_CompanyNews_SecondaryAubergine_Hero.jpg?d=500x500&amp;f=fill',
          warehouses: [1,3]
        },
        {
          name: 'Basecamp',
          logo: 'https://www.growthmarketingpro.com/wp-content/uploads/2019/10/basecamp-logo.png',
          warehouses: [9,6,10]
        },
      ];

      const CompaniesCard = () => {
        const companiesCard = companies.map(company => <CompanyCard company={company}></CompanyCard>)
        return companiesCard
      }

    return (
      <>
        <div className="bg-white pt-12 pr-0 pb-12 pl-0 mt-0 mr-auto mb-0 ml-auto sm:py-16 lg:py-20">
        <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-4xl sm:px-6 lg:px-8">
            <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
                <div>
                <p className="text-xl font-bold text-gray-900">Choose company</p>
                </div>
            </div>
            <div className="shadow-xl mt-8 mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
                <div className="pt--10 pr-0 pb-10 pl-0">
                <CompaniesCard />
                </div>
            </div>
            </div>
        </div>
        </div>
    </>
    )
}