import { useState, useEffect, useCallback } from "react";
import Card from "./Components/Card/Card";
import Cart from "./Components/Cart/Cart";
import Form from "./Components/Form/Form";
import Modal from "./Components/Modal/Modal";
import Team from "./Components/Team/Team";
import type { GetItemsType, ContactsType, ProductsType } from "./Types";
import { Data } from "./data";
import { IoSettingsOutline } from "react-icons/io5";
import "./App.css";

declare global {
  interface Window {
    Telegram: any;
  }
}

const TestData = false;

const Tele = window.Telegram.WebApp;
// const TgJson = Tele ? JSON.stringify(Tele) : 'undefined';
const GetUserId = String(window.location.href).split("id=")[1];
const UserId = GetUserId ? GetUserId.split("#")[0] : undefined;

const App = () => {
  const getTeamFromStorage = (): "blue" | "gray" => {
    if (
      localStorage.getItem("team") &&
      localStorage.getItem("team") === "blue"
    ) {
      return "blue";
    } else if (
      localStorage.getItem("team") &&
      localStorage.getItem("team") === "gray"
    ) {
      return "gray";
    } else {
      return "blue";
    }
  };

  const [CartItems, setCartItems] = useState<GetItemsType[]>([]);
  const [OrderNow, setOrderNow] = useState<boolean>(false);
  const [Contacts, setContacts] = useState<ContactsType | undefined>(undefined);
  const [GetItems, setGetItems] = useState<GetItemsType[]>(
    TestData ? Data : []
  );
  const [TotalPrice, setTotalPrice] = useState<number>(0);
  const [IsWindowOpen, setIsWindowOpen] = useState<boolean>(false);
  const [SelectedItems, setSelectedItems] = useState<GetItemsType | undefined>(
    undefined
  );
  const [IsTeamOpen, setIsTeamOpen] = useState<boolean>(false);
  const [Them, setThem] = useState<"blue" | "gray">(getTeamFromStorage());
  // console.log(CartItems);

  const getBayItems = (items: GetItemsType[]): ProductsType[] => {
    const allItems: ProductsType[] = [];
    items.map((item) => {
      allItems.push({ idItem: item.idItem, amount: item.quantity });
      return item;
    });
    return allItems;
  };

  const onAdd = (item: GetItemsType) => {
    const Exist = CartItems.find(
      (x: { idItem: number }) => x.idItem === item.idItem
    );
    if (Exist) {
      setCartItems(
        CartItems.map((x) =>
          x.idItem === item.idItem
            ? { ...Exist, quantity: Exist.quantity + 3 }
            : x
        )
      );
    } else {
      setCartItems([...CartItems, { ...item, quantity: 3 }]);
    }
  };

  const onRemove = (item: GetItemsType) => {
    const Exist = CartItems.find(
      (x: { idItem: number }) => x.idItem === item.idItem
    );

    if (Exist && Exist.quantity === 1) {
      setCartItems(CartItems.filter((x) => x.idItem !== item.idItem));
    } else {
      const ItemsArray: GetItemsType[] = CartItems.map((x: GetItemsType) => {
        return x.idItem === item.idItem && Exist
          ? { ...Exist, quantity: Exist.quantity - 1 }
          : x;
      });
      setCartItems(ItemsArray);
    }
  };

  const onCheckout = () => {
    setOrderNow(true);
  };

  const handleOpenWindow = (item: GetItemsType) => {
    setIsWindowOpen(true);
    setSelectedItems(item);
  };

  const onSendData = useCallback(() => {
    if (Contacts) {
      const data = {
        products: JSON.stringify(getBayItems(CartItems)),
        contacts: {
          name: Contacts.name,
          telNo: Contacts.telNo,
          subject: Contacts.subject,
          adddres: Contacts.adddres,
          comment: Contacts.comment,
        },
      };

      Tele.sendData(JSON.stringify(data));

      Tele.close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [CartItems, Tele, Contacts]);

  const handleSetContacts = (val: ContactsType) => {
    setContacts(val);
  };

  const handleOnClose = () => {
    setIsWindowOpen(false);
    setIsTeamOpen(false);
  };

  const onBackToShop = () => {
    setOrderNow(false);
  };

  const openTeam = () => {
    setIsTeamOpen(true);
  };

  const handleOnChangeTeam = (value: "blue" | "gray") => {
    setThem(value);
  };

  useEffect(() => {
    if (Them === "blue") {
      document.body.style.backgroundColor = "#1a3a54";
      document.body.style.color = "#ffffff";
      localStorage.setItem("team", "blue");
    } else if (Them === "gray") {
      document.body.style.backgroundColor = "#727578";
      document.body.style.color = "black";
      localStorage.setItem("team", "gray");
    }
  }, [Them]);

  useEffect(() => {
    Tele.onEvent("mainButtonClicked", onSendData);
    return () => {
      Tele.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  useEffect(() => {
    setTotalPrice(
      CartItems.reduce(
        (a: number, c: { price: number; quantity: number }) =>
          a + c.price * c.quantity,
        0
      )
    );
  }, [CartItems, OrderNow]);

  useEffect(() => {
    Tele.ready();
  });

  useEffect(() => {
    if (UserId && !TestData) {
      try {
        fetch("https://snow420.ru/get?id=" + UserId, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((res) => {
            setGetItems(res);
          });
      } catch (e) {
        alert(e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [UserId]);

  return (
    <>
      {/* <div className="heading">{String(UserId)}</div> */}
      {UserId || TestData ? (
        <div className="document">
          <div
            className={
              IsWindowOpen || OrderNow || IsTeamOpen
                ? "cards__hide"
                : "cards__visible"
            }
          >
            <IoSettingsOutline
              className="cards__buttonTeam"
              onClick={openTeam}
            />
            <div className="cards__buttonUp">
              <Cart {...{ CartItems, TotalPrice, Them }} {...{ onCheckout }} />
            </div>
            <div className="cards__container">
              {GetItems.map((item) => {
                return (
                  <Card
                    {...{ item, Them }}
                    {...{ onAdd, onRemove, handleOpenWindow }}
                  />
                );
              })}
            </div>
            <div className="cards__buttonDown">
              <Cart {...{ CartItems, TotalPrice, Them }} {...{ onCheckout }} />
            </div>
            <div className="cards__space"></div>
          </div>
          <div className={IsWindowOpen ? "modal__visible" : "modal__hide"}>
            <Modal {...{ SelectedItems }} {...{ handleOnClose }} />
          </div>
          <div className={OrderNow ? "order__visible" : "order__hide"}>
            <Form
              {...{ Tele, TotalPrice, OrderNow }}
              {...{ handleSetContacts, onBackToShop }}
            />
          </div>
          <div className={IsTeamOpen ? "modal__visible" : "modal__hide"}>
            <Team {...{ Them }} {...{ handleOnClose, handleOnChangeTeam }} />
          </div>
        </div>
      ) : (
        <h1>Вы не авторизованы</h1>
      )}
    </>
  );
};

export default App;
