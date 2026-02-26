import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Box,
  Flex,
  Image,
  Text,
  Input,
  Button,
  Link as CLink,
} from "@chakra-ui/react";
import { signIn, getUser } from "./lib/api/auth.js";
import { AuthHeader } from "./components/AuthHeader";

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await signIn({ email, password });
      Cookies.set("_access_token", res.headers["access-token"]);
      Cookies.set("_client", res.headers["client"]);
      Cookies.set("_uid", res.headers["uid"]);
      navigate("calendar");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const f = async () => {
      try {
        const res = await getUser();
	if (res.data.isLogin) {
          navigate("calendar");
        }
      } catch (e) {
        console.log(e);
      }
    };
    f();
  }, [navigate]);

  return (
    <>
      <AuthHeader isLoggedIn={false} />
      <Flex
        minH="calc(100vh - 61px)"
        direction={{ base: "column", md: "row" }}
        px={{ base: "4", md: "8" }}
        py={{ base: "6", md: "0" }}
        gap={{ base: "8", md: "0" }}
      >
        {/* 画像 */}
        <Flex
          w={{ base: "100%", md: "50%" }}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Image w={{ base: "220px", md: "400px" }} src="calendar.png" />
          <Text fontSize={{ base: "24px", md: "32px" }} color="blue.500" fontWeight="bold">
            カレンダーアプリ
          </Text>
        </Flex>
        {/* フォーム */}
        <Flex
          w={{ base: "100%", md: "50%" }}
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box w="100%" maxW="400px">
            <Text fontSize={{ base: "22px", md: "24px" }} color="gray.700" fontWeight="bold" mb="24px">
              ログインページ
            </Text>
            <Input
              placeholder="メールアドレス"
              mb="16px"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              placeholder="パスワード"
              mb="16px"
              value={password}
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button w="100%" colorPalette="blue" mb="8px" onClick={login}>
              ログインする
            </Button>
            <Box textAlign="right">
              <CLink as={Link} to="/signup" color="blue.500">
                ユーザー登録はこちら
              </CLink>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default App;