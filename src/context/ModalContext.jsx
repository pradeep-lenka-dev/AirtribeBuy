// src/ModalContext.js
import { createContext, useContext, useState } from "react";
import { Modal } from "@mantine/core";
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Group,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";
const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [opened, setOpened] = useState(false);

  const showModal = (content) => {
    setModalContent(content);
    setOpened(true);
  };

  const closeModal = () => {
    setOpened(false);
    setModalContent(null);
  };

  const loginform = useForm({
    initialValues: {
      emailORmobile: "",
      password:"",
      termsOfService: false,
    },

    validate: {
      emailORmobile: (value) => {
        const emailPattern = /^\S+@\S+$/;
        const mobilePattern = /^[6-9]\d{9}$/;
        if (emailPattern.test(value) || mobilePattern.test(value)) {
          return null;
        }
        return "Invalid email or mobile number";
      },
    },
  });
  const submitLoginForm = (event) => {
    event.preventDefault();
    console.log(loginform.validate());
    if (!loginform.validate().hasErrors) {
      // Handle form submission
      console.log("Form Submitted", loginform.values);
      localStorage.setItem("AuthToken", "userdummyauthtoken");
      closeModal();
    }
  };
  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      <Modal
        opened={opened}
        onClose={closeModal}
        title='Login/Signup'
        centered
        transitionProps={{
          transition: "fade",
          duration: 600,
          timingFunction: "linear",
        }}
      >
        <Box maw={300} mx='auto'>
          <form onSubmit={submitLoginForm}>
            <TextInput
              withAsterisk
              label='email/mobile'
              placeholder='123456789'
              {...loginform.getInputProps("emailORmobile")}
            />

            <PasswordInput
              label='Password'
              placeholder='Password'
              {...loginform.getInputProps("password")}
              description='Password must include at least one letter, number and special character'
              size='md'
              withAsterisk
            />

            <Checkbox
              mt='md'
              label='I agree to sell my privacy'
              {...loginform.getInputProps("termsOfService", {
                type: "checkbox",
              })}
            />

            <Group position='right' mt='md'>
              <Button type='submit'>Submit</Button>
            </Group>
          </form>
        </Box>{" "}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};
