import React, { useState, useEffect } from "react";

import DataTable from "react-data-table-component";
import queryString from "query-string";
import { Button } from "react-bootstrap";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";
import { Link } from "react-router-dom";

import { getAllUsers, deleteUser, downloafFileById } from "../services/connect";

import SearchTerm from "./SearchTerm";

function HomePage() {
  const [listData, setListData] = useState();
  const [fillter, setfillter] = useState({
    _page: 1,
    _limit: 5,
    _sort: "name",
    _order: "asc",
    q: "",
  });

  useEffect(() => {
    fetchData();
  }, [fillter]);

  const fetchData = async () => {
    try {
      const paramString = queryString.stringify(fillter);
      const response = await getAllUsers(paramString);
      setListData(response);
    } catch (err) {
      console.log("Error", err.messsage);
    }
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    fetchData();
  };

  const handleKeywordChange = (valueSearch) => {
    setfillter({
      ...fillter,
      q: valueSearch.searchTerm,
      page: 1,
    });
  };

  const handleSort = (column, records) => {
    const getKey = column.name.toLowerCase();
    setfillter({
      ...fillter,
      _page: 1,
      _limit: 5,
      _sort: getKey,
      _order: records,
      q: "",
    });
  };

  const handleExportFileExcelById = (id) => {
    downloafFileById(id).then((res) => {
      const newData = listData.filter((row) => {
        return row.id === res.id;
      });
      const workSheet = XLSX.utils.json_to_sheet(newData);
      const workBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workBook, workSheet, "students");
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
      XLSX.writeFile(workBook, "StudentsData.xlsx");
    });
  };

  const handleExportFilePDFById = (id) => {
    downloafFileById(id).then((res) => {
      const doc = new jsPDF();
      doc.autoTable({
        theme: "grid",
        head: [["Name", "Age", "Country"]],
        body: [[res.athlete, res.age, res.country]],
      });
      doc.save("table.pdf");
    });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.athlete,
      sortable: true,
      sortServer: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
      sortServer: true,
    },
    {
      name: "Country",
      selector: (row) => row.country,
      sortable: true,
      sortServer: true,
    },
    {
      key: "action",
      align: "left",
      selector: (row) => row.action,
      cell: (record) => {
        return (
          <div className="row menu" style={{ whiteSpace: "nowrap" }}>
            <div className="col">
              <Button
                size="sm"
                variant="btn btn-outline-danger"
                onClick={() => handleDeleteUser(record.id)}
              >
                Delete
              </Button>
            </div>
            <div className="col">
              <Button
                size="sm"
                variant="btn btn-outline-success"
                onClick={() => handleExportFileExcelById(record.id)}
              >
                Download Excel
              </Button>
            </div>
            <div className="col">
              <Button
                size="sm"
                variant="btn btn-outline-success"
                onClick={() => handleExportFilePDFById(record.id)}
              >
                PDF
              </Button>
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="container-fluid pt-2">
      <div className="d-flex justify-content-between align-items-center w-90">
        <h2>List Users</h2>
        <SearchTerm onSearch={handleKeywordChange} />
        <div className="row">
          <div className="col">
            <Link
              to="/create"
              className="btn btn-outline btn-active-light-primary btn-outline-primary"
            >
              Create
            </Link>
          </div>
          <div className="col">
            <Link
              to="/chart"
              className="btn btn-outline btn-active-light-success btn-outline-success"
            >
              Chart
            </Link>
          </div>
        </div>
      </div>
      <DataTable columns={columns} onSort={handleSort} data={listData} />
    </div>
  );
}

export default HomePage;
