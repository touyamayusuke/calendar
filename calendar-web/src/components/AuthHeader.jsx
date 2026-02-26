import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { signOut } from "../lib/api/auth";

export const AuthHeader = ({ isLoggedIn = false }) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut();
    } catch (e) {
      console.log(e);
    } finally {
      Cookies.remove("_access_token");
      Cookies.remove("_client");
      Cookies.remove("_uid");
      navigate("/");
    }
  };

  return (
    <Box
      w="100%"
      borderBottom="1px solid"
      borderColor="gray.200"
      px={{ base: "4", md: "6" }}
      py="3"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold" color="blue.500" fontSize={{ base: "md", md: "lg" }}>
          カレンダーアプリ
        </Text>
        {isLoggedIn ? (
          <Button colorPalette="red" onClick={logout}>
            ログアウト
          </Button>
        ) : (
          <Button as={Link} to="/" colorPalette="blue">
            ログイン
          </Button>
        )}
      </Flex>
    </Box>
  );
};
