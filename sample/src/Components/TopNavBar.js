import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Image,
  Dropdown,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AddCartIcon from "../Assets/Svg/addCartIcon.svg";
import Fav from "../Assets/Svg/FavList.svg";
import { getFavItems } from "../ReducToolKit/Reducers/ListReducer";
import UserIcon from "../Assets/Svg/User.svg";
import FavIcon from "../Assets/Svg/FullRedheart.svg";
import "../App.css";

function TopNavbar() {
  const { addCart, showFavItemsList } = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  useEffect(() => {
    dispatch(getFavItems());
  }, []);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  return (
    <>
      <Navbar bg="primary p-2" className="fixed-top">
        <Container>
          <Navbar className="m-0 text-white fs-5">Shopify</Navbar>
          <Nav className=" text-white text-end mt-2 d-flex gap-3">
            <span>
              <Dropdown show={showDropdown}>
                <span>
                  <Image
                    src={Fav}
                    color="white"
                    title={"Favourite"}
                    style={{ cursor: "pointer" }}
                    onClick={toggleDropdown}
                  />
                  <sup className="fs-6 ms-1">{showFavItemsList.length}</sup>
                </span>
                {showDropdown && (
                  <Dropdown.Menu
                    onMouseLeave={() => {
                      setShowDropdown(false);
                    }}
                    style={{
                      width: showFavItemsList.length > 0 ? 300 : 100,
                      maxHeight: "300px",
                      overflowY: "scroll",
                      overflow:
                        showFavItemsList.length == 0 ||
                        showFavItemsList.length == 3
                          ? "hidden"
                          : "none",
                    }}
                    className="custom-scrollable-menu"
                  >
                    <Dropdown.Header>
                      {showFavItemsList.length > 0
                        ? showFavItemsList.map((val, index) => (
                            <div
                              key={index}
                              className=" border-bottom border-secondary p-1"
                            >
                              <Row>
                                <Col lg={4} className="position-relative h-100">
                                  <div
                                    style={{ position: "absolute", right: 0 }}
                                  >
                                    <Image
                                      src={FavIcon}
                                      alt={"Favourite"}
                                      width={20}
                                    />
                                  </div>
                                  <div className="text-center p-2">
                                    <Image
                                      src={val.image}
                                      alt={val.image}
                                      width={"100%"}
                                      height={70}
                                    />
                                  </div>
                                </Col>
                                <Col lg={8}>
                                  <p
                                    title={val.title}
                                    className=" text-dark fw-normal"
                                    style={{ whiteSpace: "normal" }}
                                  >
                                    {val.title}
                                  </p>
                                  <span className=" text-dark ">
                                    Price :
                                    <span className=" text-dark fw-bold">
                                      ${val.price}
                                    </span>
                                  </span>
                                </Col>
                              </Row>
                            </div>
                          ))
                        : "No Favourite"}
                    </Dropdown.Header>
                  </Dropdown.Menu>
                )}
              </Dropdown>
            </span>

            <span style={{ cursor: "pointer" }}>
              <Image src={AddCartIcon} title="Add Cart" />
              <sup className="fs-6 ms-1">{addCart.length}</sup>
            </span>
            <span style={{ cursor: "pointer" }}>
              <Image src={UserIcon} title="User Details" /> Prasananth
              Mallikarjuna
            </span>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default TopNavbar;
