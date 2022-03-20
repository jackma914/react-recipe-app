import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

function Recipe() {
  const [detail, setDetail] = useState([]);
  const [activeTab, setActiveTab] = useState("instructions");
  const params = useParams();

  const fetchDetails = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${name}/information?&apiKey=${process.env.REACT_APP_API_KEY}`
    );

    const detailData = await data.json();

    setDetail(detailData);
  };

  useEffect(() => {
    fetchDetails(params.name);
  }, [params.name]);
  console.log(detail);
  return (
    <DetailWrapper>
      <div>
        <h2>{detail.title}</h2>
        <img src={detail.image} alt="" />
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
        <div>
          <h3 dangerouslySetInnerHTML={{ __html: detail.summary }}></h3>
          <h3 dangerouslySetInnerHTML={{ __html: detail.instructions }}></h3>
        </div>
        <ul>
          {detail.extendedIngredients.map((e) => (
            <li key={e.id}>{e.original}</li>
          ))}
        </ul>
      </Info>
    </DetailWrapper>
  );
}

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 10rem;
`;

export default Recipe;
