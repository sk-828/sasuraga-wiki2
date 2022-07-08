import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import React from 'react'
import { Breadcrumb, Loading } from "../components";
import { fetchSeet } from "../api";

function makeArray(data) {
  var temp = [];
  if (data != null) {
    for (var i = 1; i < data.length; i++) {
      temp.push(i);
    }
  }
  return temp;
}

function LogsDisplay(props) {
  const [stat, setStat] = useState(0);
  function open() {
    setStat(1);
  }
  function close() {
    setStat(0);
  }
  if (stat === 0) {
    return (
      <button className="button is-large  is-rounded is-primary" onClick={open}>{props.n + "-" + props.m}を表示する</button>
    );
  }
  return (
    <>
      <button className="button is-large is-rounded is-link" onClick={close}>{props.n + "-" + props.m}を非表示にする</button>
      <iframe src={"logs/" + props.n + "-" + props.m + ".html"} width={"100%"} height={800}></iframe>
    </>
  );
}

function LogsList() {
  const [data, setData] = useState(null);
  const [array, setArray] = useState(null);
  useEffect(() => {
    var temp = [];
    if (data == null) {
    } else {
      for (var i = 1; i < data.length; i++) {
        temp.push(i);
      }
    }
    setArray(temp);
  }, [data]);
  useEffect(() => {
    fetchSeet(7).then((type) => {
      setData(type);
    });
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    const { breed } = event.target.elements;
    console.log(breed.value);
    var temp = [];
    for (var i = 1; i < data.length; i++) {
      if (Number(breed.value) === 0) {
        temp.push(i);
      } else if (Number(breed.value) === Number(data[i][1])) {
        temp.push(i);
      }
    }
    setArray(temp);
    console.log(array);
  }
  if (array == null) {
    return <Loading />
  }
  return (
    <><h2 className="title is-3">ログ一覧</h2>
      <br />
      <div>
        <form onSubmit={handleSubmit}>
          <div className="field has-addons">
            <div className="control is-expanded">
              <div className="select is-fullwidth">
                <select name="breed" defaultValue="0">
                  <option value="0">全体</option>
                  <option value="1">ユフトゥン</option>
                  <option value="2">黒上</option>
                  <option value="3">もちたぬき</option>
                  <option value="4">河辺文</option>
                  <option value="5">聖人</option>
                  <option value="6">ほらがい</option>
                </select>
              </div>
            </div>
            <div className="control">
              <button type="submit" className="button is-dark">
                Set
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="columns is-vcentered is-multiline">
        {array.map((i) => {
          return (
            <div className="column is-12" key={i}>
              <p>{data[i][0]}-{data[i][1]},{data[i][2]}</p>
              <LogsDisplay n={data[i][0]} m={data[i][1]}></LogsDisplay>
            </div>
          );
        })}

      </div></>
  );
}

export function LogsPage() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
            { href: "/logs", content: "Logs", active: true },
          ]}
        />
      </div>
      <LogsList />
    </>
  );
}