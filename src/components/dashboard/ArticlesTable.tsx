"use client";

import { TArticle } from "@/types";
import Image from "next/image";
import { MouseEventHandler } from "react";
import DeleteArticleBtn from "../Articles/DeleteArticleBtn";
import EditArticleBtn from "../Articles/EditArticleBtn";

const ArticlesTable = ({ articles }: { articles: TArticle[] }) => {
  const handleImageClicked: MouseEventHandler = (e) => {
    const target = e.target as HTMLElement;

    if (
      typeof target.requestFullscreen === "function" &&
      !document.fullscreenElement
    ) {
      return target.requestFullscreen();
    } else if (typeof document.exitFullscreen === "function") {
      document.exitFullscreen();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-2">
          <div className="overflow-hidden bg-white">
            <table className="min-w-full text-center align-middle text-sm font-light">
              <thead className="border-b border-neutral-200 font-medium">
                <tr>
                  <th scope="col" className="px-6 py-2">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Author
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Comments count
                  </th>
                  <th scope="col" className="px-6 py-2">
                    Controls
                  </th>
                </tr>
              </thead>

              <tbody>
                {articles.map((article) => (
                  <tr
                    key={article.id}
                    className="border-b border-neutral-200 font-medium"
                  >
                    <td className="px-6 py-4">{article.title}</td>

                    <td className="px-6 py-4">{article.description}</td>

                    <td className="whitespace-nowrap px-6 py-4">
                      {article.imageUrl ? (
                        <Image
                          onClick={handleImageClicked}
                          className="mx-auto aspect-square max-w-52 cursor-pointer rounded shadow"
                          width={500}
                          height={500}
                          unoptimized
                          src={article.imageUrl}
                          alt={article.title}
                        />
                      ) : (
                        <span className="mx-auto">With no image</span>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      {article.author.userName}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      {article.comments.length === 0 ? (
                        "No comments yet..."
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <p>
                            {article.comments.length} comment
                            {article.comments.length > 2 ? "s" : ""}{" "}
                          </p>

                          <button className="rounded bg-slate-400 px-3 py-1 font-normal text-white hover:bg-slate-500">
                            view comments
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="mx-auto flex max-w-20 flex-col justify-center gap-2 bg-slate-50">
                        <EditArticleBtn
                          articleId={article.id}
                          imageUrl={article.imageUrl}
                          title={article.title}
                          description={article.description}
                        />

                        <DeleteArticleBtn articleId={article.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesTable;
