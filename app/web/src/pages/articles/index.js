import ArticleCard from "@/components/article/ArticleCard";
import CreateArticleForm from "@/components/modal/CreateArticleForm";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Articles() {
  const router = useRouter();
  const { idWarehouse } = router.query;
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    if (idWarehouse) {
      fetch(
        `http://stockmanager.alexisprovo.fr/api/article/get?idWarehouse=${idWarehouse}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setArticles(data);
        });
    }
  }, [idWarehouse]);

  const ArticlesCard = () => {
    const articlesCard = articles.map((article) => (
      <ArticleCard article={article}></ArticleCard>
    ));
    return articlesCard;
  };

  function handleSubmit(form) {
    console.log(form);
    fetch("http://stockmanager.alexisprovo.fr/api/article/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_reference: form.idReference,
        id_warehouse: idWarehouse,
        expiration: form.expiration || null,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Error while adding new article");
        }
      })
      .then(() => {
        fetch(
          `http://stockmanager.alexisprovo.fr/api/article/get?idWarehouse=${idWarehouse}`,
          {
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setArticles(data);
          });
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
                  Manage articles
                </p>
              </div>
            </div>
            <div className="shadow-xl mt-8 mr-0 mb-0 ml-0 pt-4 pr-10 pb-4 pl-10 flow-root rounded-lg sm:py-2">
              <div className="pt--10 pr-0 pb-10 pl-0">
                <ArticlesCard />
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateArticleForm onSubmit={handleSubmit} />
    </>
  );
}
