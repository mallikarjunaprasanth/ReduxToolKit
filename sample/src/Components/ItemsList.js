import React, { useEffect, useState } from "react";
import { Button, Card, Container, Col, Row, Image } from "react-bootstrap";
import FavoutiteIcon from "../Assets/Svg/RedHeart.svg";
import SelectedFavoutiteIcon from "../Assets/Svg/FullRedheart.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  AddToCart,
  addFavItems,
  deleteFavItems,
  deleteItem,
  fetchList,
  getFavItems,
  updateFav,
} from "../ReducToolKit/Reducers/ListReducer";
import { toast } from "react-toastify";

const ItemsList = () => {
  const dispatch = useDispatch();
  const { ItemsList, loading } = useSelector((state) => state.list);

  useEffect(() => {
    dispatch(fetchList());
  }, []);

  return (
    <div>
      <Container fluid style={{ marginTop: "80px" }}>
        {ItemsList && loading == false ? (
          <div>
            <h4>Lists of Products </h4>
            {ItemsList.length == 0 && loading == false ? (
              <div className="text-center">No Items</div>
            ) : null}
          </div>
        ) : loading ? (
          <div className="text-center">Loading...</div>
        ) : null}
        <Row xs={1} sm={2} md={3} lg={4} gap={4} className="mt-4">
          {ItemsList.map((val, index) => (
            <Col className="mb-4" key={index}>
              <Card style={{ width: "18rem" }}>
                <div className="text-end p-3">
                  <Image
                    style={{ cursor: "pointer" }}
                    src={val.favourite ? SelectedFavoutiteIcon : FavoutiteIcon}
                    alt={"Favourite "}
                    width={30}
                    onClick={async () => {
                      let favourite = !val.favourite;
                      let obj = {
                        ...val,
                        favourite,
                      };
                      await dispatch(updateFav(obj));
                      if (favourite) {
                        await dispatch(addFavItems(obj));
                      } else {
                        await dispatch(deleteFavItems(val.id));
                      }
                      await dispatch(fetchList());
                      await dispatch(getFavItems());
                    }}
                  />
                </div>
                <div className="text-center">
                  <Card.Img
                    variant="top"
                    src={val.image}
                    style={{ height: 150, width: "50%" }}
                    className="p-2 "
                  />
                </div>
                <Card.Body>
                  <Card.Title className="text-truncate" title={val.title}>
                    {val.title}
                  </Card.Title>
                  <Card.Text className="text-truncate" title={val.description}>
                    {val.description}
                  </Card.Text>
                  <Card.Text>
                    Price :<b> ${val.price}</b>
                  </Card.Text>
                  <div className="justify-content-between d-flex">
                    <Button
                      variant="primary"
                      onClick={() => {
                        dispatch(AddToCart(val));
                      }}
                    >
                      Add Cart
                    </Button>
                    {/**<Button
                      variant="outline-danger"
                      onClick={async () => {
                        await dispatch(deleteItem(val.id)).then(() => {
                          toast.error("Item deleted successfully", {
                            position: "top-left",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                        });
                        await dispatch(fetchList());
                      }}
                    >
                      Delete Item
                    </Button>**/}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ItemsList;
