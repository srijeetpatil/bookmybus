import React, { useState, useEffect } from "react";
import styles from "../../styles/index.module.css";
import headerStyles from "../../styles/header.module.css";
import { Avatar, makeStyles, Drawer } from "@material-ui/core";

function Header() {
  const [drawer, setDrawer] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer({ ...drawer, [anchor]: open });
  };

  return (
    <div className={styles.navbar}>
      <h1
        className={styles.font}
        style={{ cursor: "pointer", marginLeft: "2rem" }}
        onClick={() => (window.location.href = "/")}
      >
        <b>Bookmybus</b>
      </h1>
      <Avatar
        style={{ marginRight: "2rem", cursor: "pointer" }}
        onClick={toggleDrawer("right", true)}
      />
      <React.Fragment key={"right"}>
        <Drawer
          anchor={"right"}
          open={drawer["right"]}
          onClose={toggleDrawer("right", false)}
        >
          <div className={`${headerStyles.drawer} ${styles.font}`}>
            <Avatar src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFRUYGBgYGhkaGBgaGhgYGBgYGBkaGhkYGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHBISGjQkISExMTExMTExNDE0NDE0NDQ0NDQ0NDQ0NDE0NDQ0NDQ0NDQxNDQ0NDQxNDQ0NDQxNDQ/NP/AABEIARMAtwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAAECBAUGBwj/xAA8EAACAQIEAwUGAwcEAwEAAAABAgADEQQSITEFQVEGYXGBsRMikaHB0TJS8AcUQmKCkuEjcqLCJLLxFf/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACERAQEAAgMBAQEAAwEAAAAAAAABAhEDITESQVETIkIE/9oADAMBAAIRAxEAPwD1lRCARlEkBMTOI4EQElGCiijwBRRR4AoopVx2Pp0VzVXVF6k79wG58oSBainBcT/aVQQ2pqX72Nh8Bc+kxKv7VX/hpJ5hj/2lzjqfqPUMXYqQec43H0kIZdCBpOQxn7RKlTdcv+w29byPCu0dIt77soPXXXvI+0dxuMRl3Vl6SglDynW9mnF015TKPDkrWdHVl6qQfmJZwA9lUUfGYy9nG92tS+Gfu1+E57g/HbKB/wDJo9pMSz0ioO84jCOQSnTSLLL5oXO1eOzjvOgt0mn2RoMEWxPvDUX0nN4mlczf7G4ps4TkJzYcl/zd/p66b3HeGu1NtTtrPHalNqeJGnP4z6MdAVIPSeI9rqQTF5VGzgjz5Tszv1C+dV6P2JpH2GY/xaxRdj2ZaWVha0UNKldSBHEQEkIlHiijxgo8UUAUaKcd2+7UfutPIh/1GG/NV6+Jjxx3dQrdJ9re2tLCgopDVem4U9/U908b432iq4hy7uTfv5dB0HdMrGYpnYsxJJlNmnRjjMU+rDVoJqkEXkSY7SF9pEMQRAExiYlN3hHH6lBsyMR1HI+I2M7nh3aMYj3tnA1Xrbms8ovLODxbIwZSQQb6dZGWEyTY9mw2IZ7h1NhteZPE0VKgK8xqIbAcaSthg4sHHusBpZu7uO8yQSzAsZxck10ItqmfWdH2KwDe0dzsNBMnC0LLmveb/YzHWd0PMi0z48NZyqdvbSeV/tAoqmJpPbZlv8Z6fVrgc5wPb7DCoFcbqfjOrK/MtpV0HAqoKkDuinNdmuLAOVJ5c+4Rpcylmy29KElGEeS0IR4o8AUUaKAImfOfbbipr4mo5OmYgdwGgHwAnv3Gq+TD1W/LTe3jlNp8zY18zsepPrNuKe1GSm7QZMk0gZdIiYxMUYxKImMYo0ARjAxRoB03ZKqzOaQ/jFwO9dfS876jggqe8AT8Z5l2Yr5MTSb+a3kwI+s9Or1A4vtOXmxn1tKpQxwUsinQaWl3swpNVm1voLSvwPh6tV5EfK86OrgTScOg8bdPCRjjuy/wNXH0mKaE3nD4/HP7yvuDaei4auHXfS043thhwDpbW0rmlyx6DG4Jw5qmZhpqR42ik+z3E/ZsynYcvGKTxz/UdPR6PHUP4tLzSo4xG2YTgMdSZSBa0ag7gjLcR3OzLWjlekgx5ymHxlRVBJm7w3F+0W53EqZd6VKuxTI43xtMOAGtdtRfYDqbd886q/tYrUqhSthl06Ei45Mragg9ZrMLZsvqeO/7a1MuCrn+UD4sJ84VzrPU+L/tDo43DVKKo9NyATcqVsCLi+/TlPMcTSXkTNsMbMU3KbUWgzDukEywoRjSWWNaJSMaSIjEQCJkZIiNaAWeGPlqoejKfmJ6ViQSLC/gOc82wVEs1lBJB2G/wmxXxmKqMVFQoim2Yf6ajuY6G/UamY8nH92d6Kux4dinoOpdGVSdCQQD4XnanjCMgJIFxPNeGccSjRam7vVBOZ3e9jbZUU6he86k9NpsBw1NWFxcA2O4uL2nJz5ZcGtdyiTbt6WKAQMtjpOV4hjTUckjbbpBYfiJCZSdBH/fEvYa3mf+eZzU6Kxi0UBrnNpcE9IpHif4iRFKxs0T0HHuDra9oDDYlZf9ldbTExK5Hk8XJcrq+rymm7ScMJbwVXIdPOYWHxQHOWDih1m+7/Es79o6M6piKVyUBV06pe4YeBJv49080rY5HXK6hhyB0KnqpGq+njPS8XUJO853iXZmjVuwuj/mXa/eu3wtOvj5LMdZJut7cVToIuYo+4AyvYHf82x+UDVpvzB8dx8RNbF9ksUgJRRUUc1IzW65TY/C8waqPTNnV0PeCvrNZnLOla/TNBmTOJY72PiAfWN7Qc1HkSPrC2AMyMLmXof7v8Rrr0b4/wCIlBmRMKWXp8zGLjko9fWIBhSdtZNKBH4iF8d/7RrGNY7X8hp6RsjHkYdDtYp4oIcyAlvzNsPBR9bweIx7uczsWPefTpJ4bhzuwUbnTrO64b2Rw6i9xVZdGuQVVumQafG8jLOYizTlOCcKeuwdwRSBuSdA38q9e8ztMQjZdBLdbCkWGwELb3bTz+e552ddF6xKYbnJhrHUTXTCiBxWHBFhIxw780WlPFMpEUq16DDeKXuDT0bDYrkYHidEMLx3qrB1QXEyw3jltd8Y/tANJNSTzlbEYYhpZw66T0pqzcYd70IkMlO5jItpYorzhrZ7YT8cYVyqaKCUZGAtYGxP+Zo4mjdSCAQVJ1138fCY3G8H7Ku1a10cFvB7qCPneafCa5r0Q9rWLUyPAA3Hxil9ldOWMkmWPjExHDqDK7NTQZbWOUX8u/7TkcTQpZjZLDzE7DiQynL11PTUTCx9BiC4pgi+nW/W3TvhMvw5j+s2ngaTbD/kfvD/AP5CWvl+Z+8EKelyjDbYEa89byzh6oFvxf1ekq7n6qav4iOFU/y/Mx3wNNR+BR5D6y1XrgLvrMyrWZ9lB13P2hLadkn4BWZdl+Q+0DRpuzBQLky/+61gAQQB5D6SdBCDr+LqNIZXSdbamDwPs6bt/HY+900O0u9i0IqWBJBRien4haCx1YpQv+YgHz3nR9i+HBKRqc327lB28zf5TKS5LyuOON3+9RYx6W1lVUuJvYmgGmfWpZZVx6cf6p0qDQeJpWl5KoEBjHvIyxuzZFZdNRFCVzFI+IHQ69Jdwq9RIUWE0aCrFyya8PFl8Tw+lwJTw1PSdRWpqVmCqWYgbXmvBl9T5/iM5q7MlGHRJNUhkSdNZxS4rw/2tF05kaeI1HpM3shQCUqiXLBKh1PO6re3mJ0ab6zFwaCmlVBuH1+npM71dt8Lfmxj8dogvew008+/vmRUcjTQzc4guYKDzuTM3E4awvbTaZX104eM2swItpKYw+ZtBtNJ6I3kMIjO4yr7uYC/qY7uqskUcfh8pt3D0lTCgA+M3+KYb3m8bTFpIVexGkc6L1bappaVVW7S61LT0lZ6el4WnpruylEuLgMCbi/O3Od5hqKoiIuwUW89frOD4YmYomW+trDlqNfKd21SHHPWH/ovkSqTPr3MuF9JWdgZo5mdVEcEWh6tG+srLT5xVUCrUweUUJtFMlN+lhoT2TA7wtNrCRq1CY+7dF1EartbQyqqEbyyAY5SaY4/KMu06SwwWBVpZoreVaUOlKUeLUFFiLZmOuwLBeffa/zh+McTp4amXdhcD3Uv7znkAPrPLKHaKq+LFZze91K8gh/hUdxsYfNsaY3VddWOt/IfrxmLjKt9CdBylvF4ggkMCCDqDoRbqPKZWJFwTf4TD9068ZrsHEvcabevLz1mfhuLvSqe6QVB1X1HjIYhn5C9rak3NgO/n95mOrHQ6eNhz2E0kibllfx0VbjlI3uep2N79JjV+IkvdRZfmfGRp8MJFyyjz5WiGEOotm6W1jmMguWTTwmJDCwh0HLx9JRwWBYMNLDn+uU1MQAq3J6/PT6GRlP4rHLrtrdl195jyC282I+xnSo9zaZfZZqL4cGmbkE57/iDfa2006C5X1l49TTl5L9ZbGr0yBM52tOgxABSYz07w47tOU0DmvBOCBL1OhYQVZQZdiZVP2dxFCHSKL5H03wY6pHqsiC7MB4n6ShU4zSU2uSflCY/yC1oNG3mNiO0Cj8K+Z+0ycTx59feNu6w08pUxodfUqIi5ncKBvczkOMdtGBKYcZR+cj3j3gHRR8/Cc1j+JvUYkk5enXvMz69WVMZDmJuJ8ReqxZ2Zj1Jv6x+ziBsRTv+db+TA/SU64trDcAqFa9Mm9iw+0uXtVnT1vj/AAlagNVPx294cnAHyb1nDWOx856Dh8RdROX7QcKNzVp7nVl/7L9pjycf7FcPL/zkwxhdL2khRX+JLyzhsSCljuJNmBnPPXX6pmmn5Ykpg6AWliooA5SujG4VQSTsBL7TR2UKNN5qYXhyvhqgIBZ0JB6BfeAHwvKuH4adDUP9P3M38MbA9LTXHCzuufPOXqOD4NUfDOWQ6HRlP4WHeJ3PDcfTr7HK/NDv4qeYnCYltTI0qhFrGxGxlJuO3qNiBaDCWnP8F7SXASvryD8/BvvOmpVEf8LA93OHTOyhldJWqU5fdbQDiBM10ilp6UeLY04ipxFiTdvPffxld8Rr+KZQxV4vbX1v4TU9NU4qx6/rrK+KxWbS/j9pQevYXlYVrxWqkaJtK70xfeQp1jtIhiTpJUOuGJ7wNT9oNHC1EbazA/MS4jhRYHx75QxCCXOk729RwVbQSy5vMDs/ic1JMx97KNettPjpN1DeVlGPjPxnDke+mVvzgC/n185zuIwNem1imccmS+vip1E67E1Vpozv+FRfx6Ad84bGcTqO5cMVvsATYDkB18ZjcJW+GeUaODwVSpuuReZbQ+S738bTYw2BSnqup6nfy6TG4Lxhy4VyXB021H82nznRuJWOMgyzyvQNtYfPZT4SIEhiEujdLfOXpntw+KWzW6Ej5yNNuUtVUuxuL7+sEaYBmNbQXNpL2B4gdFJ22P0me8ruTy0gLHbYXjDiwJzDv1mlS4oh/ELeGs5TBPdQecM7WjTcY6wurD3SDFOVXEkbNGgn5eeU3YjbTr3wiv3ygXh6Vc89fGVtWhGqkm3IRkfWFRF1Oo/XfF7HvHpFo9xJKhvYS8gAG++5lSnTyjvPP6QqGVIm1LNvBu8TNIMIyjs+yVUFMp/hdl8mGYfO86M1sm4J7x9ZxXZOrld165WH9Jt6NO5dQZp7GeXqhXxhY+8Bl6ffrOY41hsj5lAyttbQDQaWG3OdLjUAso3JHrMbtC6qQm5GrdxtoJnlFY0Ds1TvVJPJSR46D6mdL+9BTbUj0nL8GxOWopI0b3fjt8wJ1Io33EJBlS/eA2iX7z0h6q+5buMakgA0EbGPlps3RWleE46ofe+MIiA7wWbaHD9JjW0V662lYkAyziVuPSZjvrruIlNrDVraiHasDMahVtLNJiNYBZqPFBsL6xRpcLJppIRw3KML+Ga8ttTBmbRciXKdaVE0dltGDdZAMT4Rn0jSfSJl2glY3ky8DanBKmWop2ubfHSejqfdv3TyrDvYg9Deem06t6SsOagjzE0x8Rl6yeJ4vKS/MaL4/rWc1Vq5ySTc3ub7k9ZZ4/VN1HifjoPQzIU5f1+v0JF9VjOmgpnZ4Ct7Smrg67N/uG/385wlJ50vZXEe+yHZhcf7l/xf4QhZR0CbSjx57UbdTb6n0mkygbTne0VfVE6An46fSPLwsfWQu40hGcDaVydrQTNMWwlWpKVWlm12MOWMixgCwtLrNFaYHOUqDc5Yd4tKSd9dIoO8aAceYstog0leUgssLTvGp66Q97SoVTpX2MIVvBB5YQXjI2QWg6iSywA25QYWBGRp3nBMTnwqjmhKHy2+RE4NV1vOl7LYn3mTkwDDxXQ/I/KXiVV+PraoB0QerTKZZrdp2/8AIYdFQf8AEH6/KZd5OXpzwkIE1+z1S1dO8kfFSJiZ+UtcMq5atM32dP8A2EX6b0YczOL4nic7ue+w8Bp951XEsSKdJn6DTxO04F3uDrvKy8TjOxXqajwiVLwCLrLqmYtQjT112kGOu0M2siVgDIwA6yTPIMbbRi8FJZ+saBZo8A5uTCwWYSYqCNI6aQgF5XBhadTl0jhUVRLNMZYBDJs0pNTD6woUW0gAJIPAk3baH4Zi/Zuj8gwv4bH5XlF3vIho5dDTZ7U1R+8uRsQlv7FmYlW/6/X6EHjsTnKk7hFB/puPS0FRMWV7OTpbvHwz++h6Mp+BErZv1+hCUHs6nowPwMSnXdrcbmK0gdveb6D1M5xxpHrYgu7Od2N/LlBVXjt2mTQ1BtReXVUShSOstF7CRVp5hI1Xgke8YxAztIGpyjuJXaATZ4oJooKYZklECWiBgkfNJo9jKxMkhjGl8VOUIjXlZDpDAy4irKmOtpXzSXtYEO4FpXJ1jPUgRUhsxHHOQR7Ry8AhiqotGpJ02lZoQNFDXVkWeQSppIs2sdTFumbGFJMrUm11lpGkml4SVrCK4t3wD1uURpu8rOZDPrBu8AIWigQ0aCmMY6mNFAJXk6ZkVF44WCVlGsYW8q3hVe4lSlRQY7NaDEi+sZETIhpLLIgRGKDHdNjEoju1xaOkdBf4f4kbxIdPGO0RiI0RbUQaHWOx1jC0N5ZRrSmjx3rSQsvVkGN5X9peSzwMn0EAGk6jweYRHDl4oIvFA2eu0eRUyV4AwaGVoKJWgWlgGSRtYFTJ5oEtMZEQSPeEl7Se0iY0URpiQd7RB9IBmN4WiRZVtI2aCR414tnoQuRGVyTvIsYyHWAWEaxk80qg6woMAKWjF4MmRLQCVR5DNIGImIJZooMtFBSuseKKAIx4ooBJZMRRQCSbyxyjRRxNIwY3EUUZEJA8oooUHEeKKBmipRRRA4khFFAGbeO20UUAg0i0aKJSMUUUA//Z" />
            <h3 className={headerStyles.username}>Srijeet Patil</h3>
            <label
              className={headerStyles.option}
              onClick={() => (window.location.href = "/local-travel")}
            >
              Local travel
            </label>
            <label
              className={headerStyles.option}
              onClick={() => (window.location.href = "/profile/my-bookings")}
            >
              Your current booking
            </label>
            <label
              className={headerStyles.option}
              onClick={() => (window.location.href = "/profile/history")}
            >
              History
            </label>
            <label className={headerStyles.option}>Log out</label>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}

export default Header;
