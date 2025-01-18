import React from "react";

const Navbar = () => {
  return (
    <nav className="flex p-3 bg-slate-700 justify-around">
      <div className="c-name m-auto font-bold text-2xl cursor-pointer">Your Task Manager</div>
      {/* <div className="navigators">
        <ul className="flex">
          <li className="hover:font-bold cursor-pointer">Your Todos</li>
        </ul>
      </div> */}
    </nav>
  );
};

export default Navbar;
