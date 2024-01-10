import { Button, Form, Input, Skeleton } from "antd";
import { Logo } from "../../components";
import { useGetData } from "../../hooks";
import { TfiReload } from "react-icons/tfi";
import { useMutation } from "@tanstack/react-query";
import { axiosInstans } from "../../api";
import { useAppDispatch } from "../../redux";
import { loginActions } from "../../redux/login.slice";

interface LoginValues {
  username: string;
  password: string;
}

interface LoginDataTypes {
  accessToken: string;
  fullName: string;
}

export const Login = () => {
  // console.log(import.meta.env.VITE_API_URL);
  const {
    data: captcha,
    isFetching: isFetchingCaptcha,
    refetch: captchaRefetch,
  } = useGetData<string>(
    "operator/login/get-captcha",
    ["captcha"],
    {},
    {
      params: {
        token: "Token",
      },
    }
  );

  const dishpath = useAppDispatch();

  const onClickRetry = (evt: React.MouseEvent<HTMLElement, MouseEvent>) => {
    evt.stopPropagation();
    captchaRefetch();
  };

  async function login(val: LoginValues) {
    const { data } = await axiosInstans.post<{
      data: LoginDataTypes;
    }>("operator/login", {
      login: val.username,
      password: val.password,
    });

    dishpath(loginActions.setToken(data.data.accessToken));
  }

  const { mutate, isPending } = useMutation({
    mutationFn: (val: LoginValues) => login(val),
  });

  const onFinish = (val: LoginValues) => {
    mutate(val);
  };

  return (
    <div className="h-screen w-full flex text-black">
      <div className="bg-white w-[45%]  h-screen px-10 py-12">
        <Logo open dark={false} />

        <div className="pl-8 mt-12 max-w-lg">
          <h1 className="text-5xl font-bold">Sign in</h1>

          <Form className="mt-10" onFinish={onFinish}>
            <Form.Item
              label={"User Name"}
              name={"username"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              className="mt-6"
              label={"Password"}
              name={"password"}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <div className="flex items-center gap-2">
              {captcha && !isFetchingCaptcha ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: captcha,
                  }}
                ></div>
              ) : (
                <Skeleton.Button
                  style={{
                    width: 150,
                    height: 50,
                  }}
                  active
                />
              )}

              <Form.Item
                name={"capcha"}
                className="mb-0 w-full"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  suffix={
                    <Button
                      onClick={onClickRetry}
                      className="-mr-1 rounded-xl border-none h-auto"
                      icon={<TfiReload />}
                    />
                  }
                />
              </Form.Item>
            </div>

            <Button
              loading={isPending}
              className="h-auto w-full py-[8px] bg-[#1F2A66FF] text-white rounded-xl mt-10"
              htmlType="submit"
            >
              Sign in
            </Button>
          </Form>
        </div>
      </div>
      <div className="bg-[#1F2A66FF] w-[55%]  h-screen"></div>
    </div>
  );
};
