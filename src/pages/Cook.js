import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from 'react'
import { Breadcrumb, Loading } from "../components";

function Cook() {
  return (
    <>
      <iframe width="1480" height="860" frameborder="0" src="pages/山菜おこわ.html"></iframe>
      <iframe width="1480" height="860" frameborder="0" src="pages/塩漬け魚の木の実漬け.html"></iframe>
      <iframe width="1480" height="860" frameborder="0" src="pages/きのこと魚のつみれ汁.html"></iframe>
      <iframe width="1480" height="860" frameborder="0" src="pages/ウサギ肉のロースト.html"></iframe>
    </>
  );
}

export function CookPage() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
          ]}
        />
      </div>
      <Cook></Cook>
    </>
  );
}