import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import React from "react";

const Recipe = () => {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  const fetchDetails = async () => {
    const REACT_APP_API_KEY = "c57cd0fb16ae4a09a5f0dd0f1ef4dafd";
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${REACT_APP_API_KEY}`,
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>

      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>

        {activeTab === "instructions" && (
          <div>
            <p dangerouslySetInnerHTML={{ __html: details.summary }}></p>
            <p dangerouslySetInnerHTML={{ __html: details.instructions }}></p>
          </div>
        )}

        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}

      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 880px) {
    & {
      margin-top: 5rem;
      flex-direction: column;
      align-items: center;
    }
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h2 {
    margin-bottom: 2rem;
    
    @media (max-width: 600px) {
      & {
        text-align: center;
        font-size: 1.2rem;
      }
    }
  }

  li {
    font-size: 1rem;
    line-height: 2rem;
  }

  ul, ol {
    margin-top: 1rem;
    margin-left: 1.5rem;
  }

  p {
    margin-top: 1rem;
  }

  img {
    max-width: 420px;
    @media (max-width: 600px) {
      & {
        max-width: 100%
      }
    }
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  border-radius: 7px;
  cursor: pointer;

  @media (max-width: 600px) {
    & {
      margin-right: 0.7rem
    }
  }
`;

const Info = styled.div`
  flex: 0 1 600px;
`;

export default Recipe;