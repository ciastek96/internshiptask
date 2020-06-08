import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Heading from "../components/Heading/Heading";
import Input from "../components/Input/Input";

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyDetails = styled.div`
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.primary};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 20px 0;
`;

const Paragraph = styled.p`
  border-bottom: 1px solid ${({ theme }) => theme.primary};
  padding: 10px 15px;

  &:last-of-type,
  &:nth-last-of-type(2) {
    border-bottom: none;
  }
`;

const DetailsName = styled(Paragraph)`
  background: ${({ theme }) => theme.secondary};
  border-right: 1px solid ${({ theme }) => theme.primary};
  font-weight: 600;
`;

const DetailsPageTemplate = ({ location }) => {
  const { id, name, city, incomes } = location.state;
  const [totalIncome, setTotalIncome] = useState(0);
  const [avgIncome, setAvgIncome] = useState(0);
  const [lastMonthIncome, setLastMonthIncome] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(new Date());

  const filteredIncomes = incomes.filter((item) => {
    const itemDate = new Date(item.date);
    return itemDate >= startDate && itemDate <= endDate;
  });

  useEffect(() => {
    countTotalIncome();
    countAvgIncome();
    countLastMonthIncome();
  });

  const countTotalIncome = () => {
    const totalIncome = filteredIncomes.reduce(
      (total, item) => (total += parseFloat(item.value)),
      0
    );
    setTotalIncome(totalIncome);
  };

  const countAvgIncome = () => {
    if (filteredIncomes.length > 0) {
      const avgValue = totalIncome / filteredIncomes.length;
      setAvgIncome(avgValue);
    } else setAvgIncome(0);
  };

  const countLastMonthIncome = () => {
    const endDate = new Date();
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 30);

    const lastMonthIncome = incomes
      .filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
      })
      .reduce((total, item) => (total += parseFloat(item.value)), 0);
    setLastMonthIncome(lastMonthIncome);
  };

  const handleStartDate = (e) => {
    const value = new Date(e.target.value);
    setStartDate(value);
  };

  const handleEndDate = (e) => {
    const value = new Date(e.target.value);
    setEndDate(value);
  };

  return (
    <StyledWrapper>
      <Link to="/">
        <p>Go to previous page</p>
      </Link>
      <Heading>{name}</Heading>
      <CompanyDetails>
        <DetailsName>ID: </DetailsName>
        <Paragraph>{id}</Paragraph>
        <DetailsName>Name: </DetailsName>
        <Paragraph>{name}</Paragraph>
        <DetailsName>City: </DetailsName>
        <Paragraph>{city}</Paragraph>
        <DetailsName>Total income: </DetailsName>
        <Paragraph>{totalIncome.toFixed(2)}</Paragraph>
        <DetailsName>Average income: </DetailsName>
        <Paragraph>{avgIncome.toFixed(2)}</Paragraph>
        <DetailsName>Last month income: </DetailsName>
        <Paragraph>{lastMonthIncome.toFixed(2)}</Paragraph>
      </CompanyDetails>

      <label htmlFor="startDate">Start date: </label>
      <Input type="date" id="startDate" onChange={handleStartDate} />

      <label htmlFor="endDate">End date: </label>
      <Input type="date" id="endDate" onChange={handleEndDate} />
    </StyledWrapper>
  );
};

export default DetailsPageTemplate;
