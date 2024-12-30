import React from "react";
import { CardBody, CardContainer, CardItem } from "./3dCard";
import { Link } from "react-router-dom";
import LiqImg from "../assets/liquidation.webp";

interface CustomCardProps {
  name: string;
  path: string;
}

export function CustomCard({ name, path }: CustomCardProps) {
  return (
    <CardContainer className="inter-var">
      <CardBody className="relative group/card hover:shadow-xl hover:shadow-emerald-500/[0.1] bg-secondary border-accent/[0.5] w-[24rem] h-[27rem] rounded-lg p-4 border flex flex-col justify-center gap-2">
        <CardItem
          translateZ="50"
          className="text-xl font-bold  text-lightBlue w-full text-center"
        >
          {name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-sm max-w-xs mt-2 text-accent text-center"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={LiqImg}
            // "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            height="700"
            width="700"
            className="h-48 w-full object-cover rounded-lg group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-center items-center mt-10">
          <CardItem
            translateZ={20}
            as={Link}
            to={path}
            // target="__blank"
            className="px-6 py-3 rounded-lg text-xs font-normal text-primary bg-lightBlue"
          >
            Earn now →
          </CardItem>
          {/* <CardItem
            translateZ={20}
            as="button"
            className="px-3 py-1 rounded-lg bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Sign up
          </CardItem> */}
        </div>
      </CardBody>
    </CardContainer>
  );
}
