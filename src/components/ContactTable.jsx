import React from "react";
import { useGetContactQuery } from "../redux/api/ContactApi";
import Cookies from "js-cookie";
import { Table } from "@mantine/core";

const ContactTable = () => {
  const token = Cookies.get("token");
  const { data } = useGetContactQuery(token);
  const contactData = data?.contacts?.data;
  const rows = contactData?.map((contact) => {
    return (
      <tr key={contact.id}>
        <td>{contact.name}</td>
        <td>{contact.phone}</td>
        <td>{contact.email}</td>
        <td>{contact.address}</td>
      </tr>
    );
  });
  return (
    <>
      <div>
        <Table horizontalSpacing="lg" verticalSpacing="md">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </div>
    </>
  );
};

export default ContactTable;
