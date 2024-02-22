import axios from 'axios'
import React, { useEffect } from 'react'
const ManageCategory: React.FC = () => {
    
    const getAllCategory = async()=>{
        try {
            const response = await axios.get('https://blogbackend-ten.vercel.app/category/all');
            console.log(response);

            
        } catch (error) {
          console.log(error);
            
        }


    }
    useEffect(()=>{
        getAllCategory()
    },[])
  return (
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 capitalize">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Category Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Categories
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Collaborators
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Add Collaborators
                  </th>
                </tr>
              </thead>
              {/* <tbody>
                {tasks.map((singleTask, index) => {
                  if (index % 2 === 0) {
                    var className1 =
                      "bg-white border-b dark:bg-gray-900 dark:border-gray-700";
                  } else
                    className1 =
                      "border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700";
                  return (
                    <>
                      <tr className={className1}>
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {singleTask.title}
                        </th>
                        <td className="px-6 py-4">
                          {singleTask.selectedCategories
                            .map((cat) => cat.name)
                            .join(", ")}
                        </td>
                        <td className="px-6 py-4">{singleTask.priority}</td>
                        <td className="px-6 py-4">{singleTask.status}</td>
                        <td className="px-6 py-4 flex gap-1 ">
                          {singleTask.collaborators.map(
                            (collaborator, index) => (
                              <div
                                key={collaborator._id}
                                className="border p-2 flex justify-between"
                              >
                                {collaborator.searched_username}
                                <svg
                                  onClick={() =>
                                    deleteCollab(
                                      singleTask._id,
                                      collaborator._id
                                    )
                                  }
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="red"
                                  className="w-6 h-6 ml-2 cursor-pointer"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                            )
                          )}
                        </td>
                        <td className="px-6 py-4">
                          {" "}
                          <button
                            className="btn-primary"
                            onClick={() => {
                            //   setIsModalOpen(true), setTask(singleTask);
                            }}
                          >
                            Add Collaborator
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody> */}
            </table>
          </div>  )
}

export default ManageCategory