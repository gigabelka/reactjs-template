import { useEffect, useState } from "react";
import { ContactsType, GetItemsType } from "../Types";
import { Data } from "../data";
import { IoSettingsOutline } from "react-icons/io5";
import Cart from "../Cart/Cart.tsx";
import Card from "../Card/Card.tsx";
import Modal from "../Modal/Modal.tsx";
import Form from "../Form/Form.tsx";
import Team from "../Team/Team.tsx";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type PropsType = {
  //
};

const Main: React.FC<PropsType> = () => {
  const TestData = true;

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
  const [GetItems] = useState<GetItemsType[]>(TestData ? Data : []);
  const [TotalPrice, setTotalPrice] = useState<number>(0);
  const [IsWindowOpen, setIsWindowOpen] = useState<boolean>(false);
  const [SelectedItems, setSelectedItems] = useState<GetItemsType | undefined>(
    undefined
  );
  const [IsTeamOpen, setIsTeamOpen] = useState<boolean>(false);
  const [Them, setThem] = useState<"blue" | "gray">(getTeamFromStorage());
  console.log(Contacts);

  // const getBayItems = (items: GetItemsType[]): ProductsType[] => {
  //   const allItems: ProductsType[] = [];
  //   items.map((item) => {
  //     allItems.push({ idItem: item.idItem, amount: item.quantity });
  //     return item;
  //   });
  //   return allItems;
  // };

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

  // const onSendData = useCallback(() => {
  //   //
  // }, [CartItems, Contacts]);

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
    setTotalPrice(
      CartItems.reduce(
        (a: number, c: { price: number; quantity: number }) =>
          a + c.price * c.quantity,
        0
      )
    );
  }, [CartItems, OrderNow]);

  return (
    <>
      {/* <div className="heading">{String(UserId)}</div> */}
      {TestData ? (
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
              {...{ TotalPrice, OrderNow }}
              {...{ handleSetContacts, onBackToShop }}
            />
          </div>
          <div className={IsTeamOpen ? "modal__visible" : "modal__hide"}>
            <Team {...{ Them }} {...{ handleOnClose, handleOnChangeTeam }} />
          </div>
        </div>
      ) : (
        <h1>Вы не авторизованы, требуется ввести пригласительный код</h1>
      )}
    </>
  );
};

export default Main;
