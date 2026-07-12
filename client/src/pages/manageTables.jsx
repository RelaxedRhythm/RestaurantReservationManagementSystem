import { useEffect, useState } from "react";
import api from "../services/api";

export default function ManageTables() {

  const [tables, setTables] = useState([]);

  const [tableNumber, setTableNumber] = useState("");
  const [capacity, setCapacity] = useState("");

  const [editingTable, setEditingTable] = useState(null);

  const loadTables = async () => {
    try {
      const response = await api.get("/tables");
      setTables(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTables();
  }, []);


  // CREATE TABLE
  const createTable = async (e) => {
    e.preventDefault();

    try {

      await api.post("/tables", {
        number: Number(tableNumber),
        capacity: Number(capacity)
      });


      setTableNumber("");
      setCapacity("");

      loadTables();

    } catch (error) {
      console.error(error);
    }
  };



  // DELETE TABLE
  const deleteTable = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this table?"
    );

    if(!confirmDelete) return;


    try {

      await api.delete(`/tables/${id}`);

      loadTables();

    } catch(error) {

      console.error(error);

    }

  };



  // UPDATE TABLE
  const updateTable = async (e) => {

    e.preventDefault();

    try {

      await api.put(`/tables/${editingTable._id}`, {

        number: Number(editingTable.number),

        capacity: Number(editingTable.capacity)

      });


      setEditingTable(null);

      loadTables();


    } catch(error){

      console.error(error);

    }

  };



  return (

    <div className="max-w-5xl mx-auto p-8">


      <h1 className="text-3xl font-bold mb-8">
        Manage Tables
      </h1>



      {/* ADD TABLE */}

      <div className="bg-white shadow rounded-xl p-6 mb-8">


        <h2 className="text-xl font-semibold mb-4">
          Add New Table
        </h2>


        <form 
          onSubmit={createTable}
          className="flex gap-4"
        >


          <input

            type="number"

            placeholder="Table Number"

            value={tableNumber}

            onChange={(e)=>setTableNumber(e.target.value)}

            className="border rounded-lg p-2"

            required

          />



          <input

            type="number"

            placeholder="Capacity"

            value={capacity}

            onChange={(e)=>setCapacity(e.target.value)}

            className="border rounded-lg p-2"

            required

          />



          <button

            className="bg-blue-600 text-white px-5 rounded-lg"

          >

            Add Table

          </button>



        </form>


      </div>





      {/* TABLE LIST */}


      <div className="bg-white shadow rounded-xl p-6">


        <h2 className="text-xl font-semibold mb-4">
          Restaurant Tables
        </h2>



        <table className="w-full">


          <thead>

            <tr className="border-b">


              <th className="text-left p-3">
                Table No
              </th>


              <th className="text-left p-3">
                Capacity
              </th>


              <th className="text-left p-3">
                Actions
              </th>


            </tr>

          </thead>



          <tbody>


          {
            tables.map((table)=>(

              <tr 
                key={table._id}
                className="border-b"
              >


                <td className="p-3">

                  {
                    editingTable?._id === table._id ?

                    <input

                      value={editingTable.number}

                      onChange={(e)=>
                        setEditingTable({
                          ...editingTable,
                          number:e.target.value
                        })
                      }

                      className="border p-1 rounded"

                    />

                    :

                    table.number

                  }

                </td>





                <td className="p-3">


                {
                  editingTable?._id === table._id ?

                  <input

                    value={editingTable.capacity}

                    onChange={(e)=>
                      setEditingTable({
                        ...editingTable,
                        capacity:e.target.value
                      })
                    }

                    className="border p-1 rounded"

                  />

                  :

                  table.capacity

                }


                </td>





                <td className="p-3 flex gap-3">


                {
                  editingTable?._id === table._id ?

                  <>

                    <button

                      onClick={updateTable}

                      className="bg-green-600 text-white px-3 py-1 rounded"

                    >

                      Save

                    </button>



                    <button

                      onClick={()=>setEditingTable(null)}

                      className="bg-gray-500 text-white px-3 py-1 rounded"

                    >

                      Cancel

                    </button>


                  </>


                  :

                  <>


                  <button

                    onClick={()=>setEditingTable(table)}

                    className="bg-yellow-500 text-white px-3 py-1 rounded"

                  >

                    Edit

                  </button>



                  <button

                    onClick={()=>deleteTable(table._id)}

                    className="bg-red-600 text-white px-3 py-1 rounded"

                  >

                    Delete

                  </button>


                  </>

                }



                </td>


              </tr>


            ))
          }


          </tbody>


        </table>


      </div>



    </div>

  );
}