import ReferenceCard from "@/components/reference/ReferenceCard";
import CreateReferenceForm from "@/components/modal/CreateReferenceForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function References() {
  const router = useRouter();
  const { idCompany } = router.query;
  const [references, setReferences] = useState([]);

  useEffect(() => {
    if (idCompany) {
      fetch(
        `http://stockmanager.alexisprovo.fr/api/reference/get?companyId=${idCompany}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => setReferences(data))
    }
  }, [idCompany]);

  const ReferencesCard = () => {
    const referencesCard = references.map((reference) => (
      <ReferenceCard reference={reference} handleUpdate={handleUpdate} handleDelete={handleDelete}></ReferenceCard>
    ));
    return referencesCard;
  };

  function handleDelete(reference) {
    fetch("http://stockmanager.alexisprovo.fr/api/reference/delete", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyId: idCompany,
        referenceId: reference.id
      }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error while deleting reference");
      }
    })
    .then(() => {
      const updatedReferences = references.filter(
        (r) => r.id !== reference.id
      );
      setReferences(updatedReferences);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  function handleUpdate(form, reference) {
    fetch("http://stockmanager.alexisprovo.fr/api/reference/update", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: reference.id,
        barcode_value: form.barcode_value,
        name: form.name,
        price: form.price
      })
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error while updating reference");
      }
    })
    .then(() => {
      const index = references.findIndex((r) => r.id === reference.id);
      const updatedReference = {
        ...reference,
        barcode_value: form.barcode_value,
        name: form.name,
        price: form.price
      };
      const nextReferences = references.slice();
      nextReferences.splice(index, 1, updatedReference);
      setReferences(nextReferences);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  function handleSubmit(form) {
    console.log(form)
    fetch("http://stockmanager.alexisprovo.fr/api/reference/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reference: {
            barcode_value: form.barcode_value,
            name: form.name,
            price: form.price
        },
        companyId: idCompany
    }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error while adding new warehouse");
        }
      })
      .then((data) => {
        const newReference = data
        const nextReferences = references.slice();
        nextReferences.push(newReference);
        setReferences(nextReferences);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div className="bg-white pt-12 pr-0 pb-12 pl-0 mt-0 mr-auto mb-0 ml-auto sm:py-16 lg:py-20">
        <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto max-w-4xl sm:px-6 lg:px-8">
            <div className="pt-0 pr-4 pb-0 pl-4 mt-0 mr-auto mb-0 ml-auto sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-bold text-gray-900">
                  Manage references
                </p>
              </div>
            </div>
            <div className="shadow-xl mt-8 mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
              <div className="pt--10 pr-0 pb-10 pl-0">
                <ReferencesCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateReferenceForm onSubmit={handleSubmit} />
    </>
  );
}
