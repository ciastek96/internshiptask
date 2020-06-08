import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px auto;
  width: 100%;

  @media all and (min-width: 380px) {
    max-width: 380px;
  }
`;

const List = styled.ul`
  align-items: center;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.primary};
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin: 0;
  overflow: hidden;
  padding: 0;
  width: 100%;
`;

const ListItem = styled.li`
  border-left: 1px solid ${({ theme }) => theme.primary};
  height: 100%;
  list-style: none;
  margin: 0;
  text-align: center;
  transition: background-color 0.15s ease-in;
  width: 100%;

  &:first-of-type,
  &:last-of-type,
  &:hover {
    background-color: ${({ theme }) => theme.secondary};
  }

  &:first-of-type {
    border-left: 1px solid ${({ theme }) => theme.primary};
  }

  &.active a {
    background: ${({ theme }) => theme.secondary};
  }
`;

const StyledLink = styled(NavLink)`
  color: #000;
  display: block;
  font-size: 13px;
  font-weight: 400;
  padding: 15px 0;
  text-decoration: none;
  text-transform: uppercase;
`;

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
  loading,
}) => {
  const pageNumbers = [];
  const lastPage = Math.ceil(totalItems / itemsPerPage);
  const firstPage = 1;
  const previousPage = currentPage <= firstPage ? firstPage : currentPage - 1;
  const nextPage = currentPage >= lastPage ? lastPage : currentPage + 1;
  const firstIndex = currentPage - 2 <= 0 ? currentPage : currentPage - 2;
  const lastIndex = currentPage + 2 >= lastPage ? lastPage : currentPage + 2;

  for (let i = firstIndex; i <= lastIndex; i++) {
    pageNumbers.push(i);
  }
  if (loading) {
    return "Loading...";
  }
  return (
    <PaginationWrapper>
      <List>
        <ListItem>
          <StyledLink to="/" onClick={() => paginate(previousPage)}>
            {"<"}
          </StyledLink>
        </ListItem>

        {pageNumbers.map((pageNumber) => (
          <ListItem
            key={pageNumber}
            className={pageNumber === currentPage ? "active" : ""}
          >
            <StyledLink to="/" onClick={() => paginate(pageNumber)}>
              {pageNumber}
            </StyledLink>
          </ListItem>
        ))}

        <ListItem>
          <StyledLink to="/" onClick={() => paginate(nextPage)}>
            {">"}
          </StyledLink>
        </ListItem>
      </List>
    </PaginationWrapper>
  );
};

export default Pagination;
