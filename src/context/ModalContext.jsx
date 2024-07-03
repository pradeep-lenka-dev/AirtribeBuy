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
  Anchor
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { addUser } from "../services/usersService";
import { loginUser } from "../services/usersService";

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);
  const [opened, setOpened] = useState(false);
  const [formType, setFormType] = useState("login");

  const showModal = (content) => {
    setModalContent(content);
    setOpened(true);
  };

  const closeModal = () => {
    setOpened(false);
    setModalContent(null);
    setFormType("login");
  };

  const loginForm = useForm({
    initialValues: {
      emailORmobile: "",
      password: "",
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

  const signupForm = useForm({
    initialValues: {
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      termsOfService: false,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      mobile: (value) => (/^[6-9]\d{9}$/.test(value) ? null : "Invalid mobile number"),
      password: (value) =>
        value.length >= 8
          ? null
          : "Password must be at least 8 characters long",
      confirmPassword: (value, values) =>
        value !== values.password ? "Passwords do not match" : null,
    },
  });

  const submitLoginForm = async (event) => {
    event.preventDefault();
    if (!loginForm.validate().hasErrors) {
      await loginUser(loginForm.values);
      closeModal();
    }
  };

  const submitSignupForm = async (event) => {
    event.preventDefault();
    if (!signupForm.validate().hasErrors) {
      await addUser(signupForm.values);
      localStorage.setItem("AuthToken", "userdummyauthtoken");
      closeModal();
    }
  };

  return (
    <ModalContext.Provider value={{ showModal, closeModal, setFormType }}>
      <Modal
        opened={opened}
        onClose={closeModal}
        title={formType === "login" ? "Login" : "Signup"}
        centered
        transitionProps={{
          transition: "fade",
          duration: 600,
          timingFunction: "linear",
        }}
      >
        <Box maw={300} mx="auto">
          {formType === "login" ? (
            <form onSubmit={submitLoginForm}>
              <TextInput
                withAsterisk
                label="Email/Mobile"
                placeholder="123456789"
                {...loginForm.getInputProps("emailORmobile")}
              />
              <PasswordInput
                label="Password"
                placeholder="Password"
                {...loginForm.getInputProps("password")}
                description="Password must include at least one letter, number and special character"
                size="md"
                withAsterisk
              />
              <Checkbox
                mt="md"
                label="I agree to sell my privacy"
                {...loginForm.getInputProps("termsOfService", {
                  type: "checkbox",
                })}
              />
              <Group position="right" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
              <Group position="center" mt="md">
                <Anchor
                  component="button"
                  type="button"
                  onClick={() => setFormType("signup")}
                >
                  Don't have an account? Sign up
                </Anchor>
              </Group>
            </form>
          ) : (
            <form onSubmit={submitSignupForm}>
              <TextInput
                withAsterisk
                label="Email"
                placeholder="email@example.com"
                {...signupForm.getInputProps("email")}
              />
              <TextInput
                withAsterisk
                label="Mobile"
                placeholder="1234567890"
                {...signupForm.getInputProps("mobile")}
              />
              <PasswordInput
                label="Password"
                placeholder="Password"
                {...signupForm.getInputProps("password")}
                description="Password must be at least 8 characters long"
                size="md"
                withAsterisk
              />
              <PasswordInput
                label="Confirm Password"
                placeholder="Confirm Password"
                {...signupForm.getInputProps("confirmPassword")}
                size="md"
                withAsterisk
              />
              <Checkbox
                mt="md"
                label="I agree to the terms of service"
                {...signupForm.getInputProps("termsOfService", {
                  type: "checkbox",
                })}
              />
              <Group position="right" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
              <Group position="center" mt="md">
                <Anchor
                  component="button"
                  type="button"
                  onClick={() => setFormType("login")}
                >
                  Already have an account? Log in
                </Anchor>
              </Group>
            </form>
          )}
        </Box>
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};
