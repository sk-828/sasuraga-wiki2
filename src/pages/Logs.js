import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from 'react'
import { Breadcrumb, Loading } from "../components";
import { fetchSeet } from "../api";
function LogsDisplay(props){
  const [stat, setStat] = useState(null);
  useEffect(() => {
    setStat(0);
  }, []);
  function open(){
    setStat(1);
  }
  if(stat===0){
    return(
      <button class="button is-large  is-rounded is-primary" onClick={open}>{props.n+"-"+props.m}を表示する</button> 
    );
  }
  return(
    <iframe src={"logs/"+props.n+"-"+props.m+".html"} width={"100%"} height={800}></iframe>
  );
}
function LogsList() {
  const [data, setData] = useState(null);
  const [array, setArray] = useState(null);
  var temp = [];
  useEffect(() => {
    if (data == null) {
      for (var i = 0; i < 0; i++) {
        temp.push(i);
      }
    } else {
      for (var i = 0; i < data.length; i++) {
        temp.push(i);
      }
    }
    setArray(temp);
  }, [data]);
  useEffect(() => {
    fetchSeet(7).then((type) => {
      setData(type);
      for (var i = 0; i < type.length; i++) {
        temp.push(i);
      }
      setArray(temp);
    });
  }, []);
  if (data == null) {
    return <Loading />
  }
  return (
    <><h2>ログ一覧</h2>
      <br></br>
      <div className="columns is-vcentered is-multiline">
        {array.map((i) => {
          return (
            <div className="column is-12">
            <p>{data[i][0]}-{data[i][1]},{data[i][2]}</p>
            <LogsDisplay n={data[i][0]} m={data[i][0]}></LogsDisplay>
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
      <LogsList/>
    </>
  );
}