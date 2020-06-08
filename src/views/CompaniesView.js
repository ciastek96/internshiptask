import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

import Heading from "../components/Heading/Heading";
import Input from "../components/Input/Input";
import CompaniesTable from "../components/CompaniesTable/CompaniesTable";
import Pagination from "../components/Pagination/Pagination";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompaniesView = () => {
  const [companiesData, setCompaniesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://recruitment.hal.skygate.io/companies`)
      .then((response) => response.data)
      .then((data) => {
        const companies = data;
        const incomes = data.map((company) =>
          axios.get(`https://recruitment.hal.skygate.io/incomes/${company.id}`)
        );

        Promise.all(incomes)
          .then((response) => response.map((item) => item.data))
          .then((data) => {
            const companiesIncomes = data.map((companyIncomes) => {
              const totalIncome = parseFloat(
                companyIncomes.incomes.reduce(
                  (total, item) => (total += parseFloat(item.value)),
                  0
                )
              );
              return {
                ...companyIncomes,
                totalIncome,
              };
            });
            return companiesIncomes;
          })
          .then((companiesIncomes) => {
            companiesIncomes.forEach((item, i) => {
              if (item.id === companies[i].id) {
                const newObj = Object.assign({}, item, companies[i]);
                setCompaniesData((prevState) => [...prevState, newObj]);
              }
            });
          })
          .catch((error) => console.error("Error: ", error))
          .finally(() => setLoading(false));
      })
      .catch((error) => console.error("Error: ", error));
  }, []);

  const handleSearchBar = (e) => {
    let search = e.target.value.toLowerCase();
    setCurrentPage(1);
    setSearchValue(search);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredData = companiesData.filter((value) => {
    return value.name.toLowerCase().includes(searchValue);
  });

  const currentItems = filteredData
    .sort((a, b) => b.totalIncomes - a.totalIncomes)
    .slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <StyledWrapper>
      <Heading>Companies</Heading>
      <Input type="text" onChange={handleSearchBar} placeholder="search" />
      <CompaniesTable companies={currentItems} loading={loading} />
      {filteredData.length > 0 && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          currentPage={currentPage}
          paginate={paginate}
          loading={loading}
        />
      )}
    </StyledWrapper>
  );
};

export default CompaniesView;
