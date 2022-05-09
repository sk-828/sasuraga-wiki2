import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from 'react'
import { Breadcrumb, Loading } from "../components";

export function LogsPage() {
  return (
    <>
      <div className="box">
        <Breadcrumb
          links={[
            { href: "/", content: "Top" },
          ]}
        />
      </div>
    </>
  );
}