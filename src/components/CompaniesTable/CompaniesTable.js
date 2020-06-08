import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Row = styled.div`
  align-items: center;
  border-top: 0;
  border: 1px solid ${({ theme }) => theme.primary};
  display: grid;
  font-size: 14px;
  grid-template-columns: 5% 40% 30% 25%;
  max-width: 100%;
  padding: 0 10px;
  text-align: center;
  transition: background-color 0.15s ease-in;

  p {
    margin: 15px 0;
    word-wrap: break-word;
  }

  &:first-of-type {
    border-radius: 5px 5px 0 0;
    border-top: 1px solid ${({ theme }) => theme.primary};
  }

  &:last-of-type {
    border-radius: 0 0 5px 5px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }
`;

const Header = styled(Row)`
  background-color: ${({ theme }) => theme.secondary};
  font-weight: 600;
  text-transform: uppercase;
`;

const StyledLink = styled(Link)`
  text-align: center;
`;

const Companies = ({ companies, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <Header>
        <p>ID</p>
        <p>Name</p>
        <p>City</p>
        <p>Total incomes</p>
      </Header>
      {companies.map((company) => (
        <Row key={company.id}>
          <p>{company.id}</p>
          <p>
            <StyledLink
              to={{
                pathname: `/details`,
                state: {
                  id: company.id,
                  name: company.name,
                  city: company.city,
                  totalIncome: company.totalIncome,
                  incomes: company.incomes,
                },
              }}
            >
              {company.name}
            </StyledLink>
          </p>
          <p>{company.city}</p>
          <p>{company.totalIncome.toFixed(2)}</p>
        </Row>
      ))}
    </div>
  );
};

export default Companies;
