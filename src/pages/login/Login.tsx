import { Button, Form, Input } from "antd";
import { Logo } from "../../components";
import { useGetData } from "../../hooks";

export const Login = () => {
  // console.log(import.meta.env.VITE_API_URL);
  const { data } = useGetData<string>(
    "operator/login/get-captcha",
    ["captcha"],
    {},
    {
      headers: {
        language: "ru",
      },
      params: {
        token: "Token",
      },
    }
  );

  console.log(data);
  return (
    <div className="h-screen w-full flex text-black">
      <div className="bg-white w-[45%]  h-screen px-10 py-12">
        <Logo open dark={false} />

        <div className="pl-8 mt-12 max-w-lg">
          <h1 className="text-5xl font-bold">Sign in</h1>

          <Form className="mt-10">
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
              <div
                dangerouslySetInnerHTML={{
                  __html: data ? data : "",
                }}
              ></div>

              <Form.Item
                name={"capcha"}
                className="mb-0 w-full"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>

            <Button
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
