import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from 'react'
import { Breadcrumb, Loading } from "../components";
import { fetchSeet } from "../api";


function Documents(props) {
  const [data, setData] = useState(null);
  const [array, setArray] = useState(null);
  var temp = [];
  useEffect(() => {
    fetchSeet(props.ID).then((type) => {
      setData(type);
    });
  }, []);
  useEffect(() => {
    if (data == null) {
    } else {
      for (var i = 1; i < data.length; i++) {
        temp.push(i);
      }
    }
    setArray(temp);
  }, [data]);
  if (data == null) {
    return <Loading />
  }
  return (
    <>
      <br></br>
      <div className="columns is-vcentered is-multiline">
        未完成。ゆるして
        {array.map((i) => {
          return (<></>
          );
        })}

      </div></>
  );
}



function MaterialPageButton() {
  return (<div className="has-text-right">
    <Link className="button is-warning" to="/material">
      全体
    </Link>
    <Link className="button is-warning" to="/material1">
      ユフトゥン
    </Link>
    <Link className="button is-warning" to="/material2">
      黒上
    </Link>
    <Link className="button is-warning" to="/material3">
      もちたぬき
    </Link>
    <Link className="button is-warning" to="/material4">
      河辺文
    </Link>
    <Link className="button is-warning" to="/material5">
      聖人
    </Link>
    <Link className="button is-warning" to="/material6">
      ほらがい
    </Link>
  </div>);
}

export function MaterialPage() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/material", content: "material", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集</h2>
      <Documents ID={0} />
      <MaterialPageButton />
    </>
  );
}

export function MaterialPage1() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/material", content: "material", active: true },
            { href: "/material1", content: "yuhu", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　ユフトゥン</h2>
      <Documents ID={1} />
      <MaterialPageButton />
    </>
  );
}

export function MaterialPage2() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/material", content: "material", active: true },
            { href: "/material2", content: "kurokami", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　黒上</h2>
      <Documents ID={2} />
      <MaterialPageButton />
    </>
  );
}

export function MaterialPage3() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/material", content: "material", active: true },
            { href: "/material3", content: "mochi", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　もちたぬき</h2>
      <Documents ID={3} />
      <MaterialPageButton />
    </>
  );
}

export function MaterialPage4() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/material", content: "material", active: true },
            { href: "/material4", content: "kawabe", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　河辺文</h2>
      <Documents ID={4} />
      <MaterialPageButton />
    </>
  );
}

export function MaterialPage5() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/material", content: "material", active: true },
            { href: "/material5", content: "Saint", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　聖人</h2>
      <Documents ID={5} />
      <MaterialPageButton />
    </>
  );
}

export function MaterialPage6() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/material", content: "material", active: true },
            { href: "/material1", content: "horagai", active: true },
          ]}
        />
      </div>
      <MaterialPageButton />
      <h2 className="title is-3">設定資料集　ほらがい</h2>
      <Documents ID={6} />
      <MaterialPageButton />
    </>
  );
}
