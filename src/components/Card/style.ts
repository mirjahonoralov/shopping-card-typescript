import styled from "styled-components";

export const Container = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

export const Wrapper = styled.div`
  margin-top: 15px;
  border-radius: 10px;
  border: 1px solid silver;
  padding: 10px;
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin-top: 0;
  }

  img {
    width: 20%;
  }
`;
