import AppLayout from "@/Layouts/AppLayout";
import { Link, useForm } from "@inertiajs/react";
import {
    Anchor,
    Button,
    Card,
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
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post("/register", {
            onFinish: () => form.reset("password", "password_confirmation"),
        });
    };
    return (
        <AppLayout>
            <Container pt={"lg"}>
                <Flex justify={"center"}>
                    <Stack maw={600}>
                        <div>
                            <Title c={"tanya-pink"} order={2} ta={"center"}>
                                Glad to have you here!
                            </Title>
                            <Text ta={"center"}>
                                Already have an account?{" "}
                                <Anchor component={Link} href="/login">
                                    Login Here!
                                </Anchor>
                            </Text>
                        </div>
                        <Card withBorder>
                            <Card.Section p={"lg"}>
                                <form onSubmit={submitForm}>
                                    <Stack>
                                        <TextInput
                                            label="Full Name"
                                            value={form.data.name}
                                            onChange={(e) =>
                                                form.setData(
                                                    "name",
                                                    e.currentTarget.value
                                                )
                                            }
                                            placeholder="John Doe"
                                            error={form.errors.name}
                                        />
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

                                        <PasswordInput
                                            label="Confirm Password"
                                            value={
                                                form.data.password_confirmation
                                            }
                                            onChange={(e) =>
                                                form.setData(
                                                    "password_confirmation",
                                                    e.currentTarget.value
                                                )
                                            }
                                            error={
                                                form.errors
                                                    .password_confirmation
                                            }
                                        />

                                        <Button mt={"md"} type="submit">
                                            Create My Account
                                        </Button>
                                    </Stack>
                                </form>
                            </Card.Section>
                        </Card>
                        <Text ta={"center"}>
                            By creating an account, you agree to our{" "}
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
