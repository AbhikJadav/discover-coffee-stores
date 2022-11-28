import React from "react";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";
const { Meta } = Card;
import Link from "next/link";
import Image from "next/image";
import styles from "./Card.module.css";
import cs from "classnames";

const CardComponent = ({ name, imgUrl, href, className }) => {
  return (
    <div className={className}>
      <Card
        style={{
          width: 300,
        }}
        cover={<Image src={imgUrl} width={200} height={160} />}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={name}
          description="This is the description"
        />
      </Card>
    </div>

    // <div className={className}>
    //   <Link href={href}>
    //     <div className={cs(styles.glass, styles.card)}>
    //       <div className={styles.container}>
    //         <h4>
    //           <b>{name}</b>
    //         </h4>
    //       </div>
    //       <Image
    //         className={styles.cardImage}
    //         src={imgUrl}
    //         width={260}
    //         height={160}
    //       />
    //     </div>
    //     {/*<div className={styles.cardLink}>*/}
    //     {/*  <div className={styles.container}>*/}
    //     {/*    <div className={styles.cardHeaderWrapper}>*/}
    //     {/*      <h2>{name}</h2>*/}
    //     {/*    </div>*/}
    //     {/*    <div className={styles.cardImageWrapper}>*/}
    //     {/*      <Image*/}
    //     {/*        className={styles.cardImage}*/}
    //     {/*        src={imgUrl}*/}
    //     {/*        width={260}*/}
    //     {/*        height={160}*/}
    //     {/*      />*/}
    //     {/*    </div>*/}
    //     {/*  </div>*/}
    //     {/*</div>*/}
    //   </Link>
    // </div>
  );
};

export default CardComponent;