import AppLayout from "@/Layouts/AppLayout";
import { Link, useForm } from "@inertiajs/react";
import {
    Anchor,
    Button,
    Card,
    Checkbox,
    Container,
    Flex,
    PasswordInput,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import React from "react";

function Register() {
    const form = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post("/login", {
            onFinish: () => form.reset("password"),
        });
    };
    return (
        <AppLayout>
            <Container pt={"lg"}>
                <Flex justify={"center"}>
                    <Stack maw={600}>
                        <div>
                            <Title c={"tanya-pink"} order={2} ta={"center"}>
                                Welcome Back!
                            </Title>
                            <Text ta={"center"}>
                                Don't have an account yet?{" "}
                                <Anchor component={Link} href="/register">
                                    Register Here!
                                </Anchor>
                            </Text>
                        </div>
                        <Card withBorder>
                            <Card.Section p={"lg"}>
                                <form onSubmit={submitForm}>
                                    <Stack>
                                        <TextInput
                                            label="Email Address"
                                            type="email"
                                            value={form.data.email}
                                            onChange={(e) =>
                                                form.setData(
                                                    "email",
                                                    e.currentTarget.value
                                                )
                                            }
                                            placeholder="john@domain.com"
                                            error={form.errors.email}
                                        />

                                        <PasswordInput
                                            label="Password"
                                            value={form.data.password}
                                            onChange={(e) =>
                                                form.setData(
                                                    "password",
                                                    e.currentTarget.value
                                                )
                                            }
                                            error={form.errors.password}
                                        />
                                        <Checkbox
                                            label="Remember me"
                                            checked={form.data.remember}
                                            onChange={(e) =>
                                                form.setData(
                                                    "remember",
                                                    e.currentTarget.checked
                                                )
                                            }
                                        />

                                        <Button mt={"md"} type="submit">
                                            Login
                                        </Button>
                                    </Stack>
                                </form>
                            </Card.Section>
                        </Card>
                        <Text ta={"center"}>
                            By loging in, you agree to our{" "}
                            <Anchor>Terms of Service</Anchor> and{" "}
                            <Anchor>Privacy Policy</Anchor>
                        </Text>
                    </Stack>
                </Flex>
            </Container>
        </AppLayout>
    );
}

export default Register;
