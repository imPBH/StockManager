import CompanyCard from "@/components/company/CompanyCard";
import CreateCompany from "@/components/modal/ModalForm";
import { useState, useEffect } from "react";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const CompaniesCard = () => {
    const companiesCard = companies.map((company) => (
      <CompanyCard company={company}></CompanyCard>
    ));
    return companiesCard;
  };

  function handleSubmit(form) {
    console.log(form);

    fetch("http://stockmanager.alexisprovo.fr/api/companies/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: form.companyName }),
    }).then((response) => {
      if (response.ok) {
        const newCompany = {
          name: form.companyName,
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk8bUSqr03ci51Fgv4DFkCEtx-6hs8F5_Jfd2GYk5dk35zKgKpEQ3XcTcfZOnR-uvNu_8&usqp=CAU",
          warehouses: [9, 6, 10],
        };
        const nextCompanies = companies.slice();
        nextCompanies.push(newCompany);
        setCompanies(nextCompanies);
      } else {
        throw new Error("Error while adding new company");
      }
    });
  }

  useEffect(() => {
    fetch("http://stockmanager.alexisprovo.fr/api/companies/get", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const mappedCompanies = data.map((company) => ({
          name: company.name,
          logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk8bUSqr03ci51Fgv4DFkCEtx-6hs8F5_Jfd2GYk5dk35zKgKpEQ3XcTcfZOnR-uvNu_8&usqp=CAU",
          warehouses: [9, 6, 10],
        }));
        setCompanies(mappedCompanies);
      });
  }, []);

  return (
    <>
      <div className="bg-white pt-12 pr-0 pb-12 pl-0 mt-0 mr-auto mb-0 ml-auto sm:py-16 lg:py-20">
        <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-4xl sm:px-6 lg:px-8">
            <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-bold text-gray-900">
                  Choose company
                </p>
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
      <CreateCompany onSubmit={handleSubmit} />
    </>
  );
}
