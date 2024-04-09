import DashboardLayout from "@/Layouts/DashboardLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import {
    AspectRatio,
    Avatar,
    Button,
    Card,
    FileButton,
    Grid,
    Group,
    Image,
    Space,
    Stack,
    Switch,
    Text,
    TextInput,
    Textarea,
    Title,
} from "@mantine/core";
import React from "react";

function PageIndex({ page }: any) {
    const { auth }: any = usePage().props;
    const form = useForm({
        name: auth?.user?.name,
        bio: page?.description,
        username: page?.username,
    });

    const settingForm = useForm({
        is_accepting_questions: page?.is_accepting_questions || false,
        allow_anon_questions: page?.allow_anon_questions || false,
    });

    const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.put(route("page.update", page?.id));
    };

    const updateSettingForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        settingForm.put(route("page.settings"));
    };

    const handleUploadProfile = (e: File | null) => {
        if (e) {
            router.post(route("profile.picture"), { file: e });
        }
    };

    const handleBannerUpload = (e: File | null) => {
        if (e) {
            router.post(route("page.banner"), { file: e });
        }
    };

    return (
        <DashboardLayout>
            <Card>
                <Card.Section pt={"lg"}>
                    <Title order={5}>Appearance</Title>
                </Card.Section>
                <Card.Section>
                    <Grid align="center">
                        <Grid.Col span={{ base: 12, lg: 3 }}>
                            <Group justify="center">
                                <Avatar
                                    radius={"100%"}
                                    w={150}
                                    h={150}
                                    src={auth?.user?.profile_photo_url}
                                />
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 9 }}>
                            <Title order={5}>Profile Picture</Title>
                            <Text size="sm" c="dimmed" pb={"sm"}>
                                Change your profile picture, Recomended size are
                                100 x 100. Profile Picture format PNG, JPG, and
                                JPEG
                            </Text>
                            <FileButton
                                onChange={handleUploadProfile}
                                accept="image/png,image/jpeg"
                            >
                                {(props) => (
                                    <Button {...props} variant="outline">
                                        {" "}
                                        Change Profile Picture
                                    </Button>
                                )}
                            </FileButton>
                        </Grid.Col>
                    </Grid>
                </Card.Section>

                <Card.Section>
                    <Grid align="center">
                        <Grid.Col span={{ base: 12, lg: 3 }}>
                            <Group justify="center">
                                <AspectRatio
                                    w={"100%"}
                                    h={"auto"}
                                    ratio={16 / 9}
                                >
                                    <Image
                                        radius={"md"}
                                        w={"100%"}
                                        h={"100%"}
                                        src={page?.header_image_url}
                                    />
                                </AspectRatio>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, lg: 9 }}>
                            <Title order={5}>Page Banner</Title>
                            <Text size="sm" c="dimmed" pb={"sm"}>
                                Change your page banner, Recomended size are
                                1920 x 1080. Banner format PNG, JPG, and JPEG
                            </Text>
                            <FileButton
                                onChange={handleBannerUpload}
                                accept="image/png,image/jpeg"
                            >
                                {(props) => (
                                    <Button {...props} variant="outline">
                                        {" "}
                                        Change Page Banner
                                    </Button>
                                )}
                            </FileButton>
                        </Grid.Col>
                    </Grid>
                </Card.Section>
            </Card>
            <Space m="md" />
            <Card>
                <Card.Section pb={"sm"}>
                    <Title order={5}>Your Page</Title>
                </Card.Section>
                <Card.Section pt="sm">
                    <form onSubmit={submitForm}>
                        <Stack>
                            <TextInput
                                label="Name"
                                required
                                value={form.data.name}
                                onChange={(e) =>
                                    form.setData("name", e.currentTarget.value)
                                }
                                error={form.errors.name}
                            />
                            <TextInput
                                label="Username"
                                required
                                value={form.data.username}
                                onChange={(e) =>
                                    form.setData(
                                        "username",
                                        e.currentTarget.value
                                    )
                                }
                                error={form.errors.username}
                                description="tanyanyaid.com/@username"
                                leftSection="@"
                            />
                            <Textarea
                                label="Bio"
                                minRows={4}
                                autosize
                                value={form.data.bio}
                                onChange={(e) =>
                                    form.setData("bio", e.currentTarget.value)
                                }
                                error={form.errors.bio}
                                placeholder="Tell us about yourself."
                            />
                            <Group justify="end" mt={"md"}>
                                <Button type="submit">Update Page</Button>
                            </Group>
                        </Stack>
                    </form>
                </Card.Section>
            </Card>
            <Space m={"md"} />
            <Card>
                <Card.Section pb={"sm"}>
                    <Title order={5}>Page Settings</Title>
                </Card.Section>
                <Card.Section pt={"sm"}>
                    <form onSubmit={updateSettingForm}>
                        <Stack>
                            <Switch
                                label="Accpeting new questions"
                                checked={
                                    settingForm.data.is_accepting_questions
                                }
                                onChange={(e) =>
                                    settingForm.setData(
                                        "is_accepting_questions",
                                        e.currentTarget.checked
                                    )
                                }
                            />
                            <Switch
                                label="Allow anonymous questions"
                                checked={settingForm.data.allow_anon_questions}
                                onChange={(e) =>
                                    settingForm.setData(
                                        "allow_anon_questions",
                                        e.currentTarget.checked
                                    )
                                }
                            />
                            <Group justify="end">
                                <Button type="submit">Update Settings</Button>
                            </Group>
                        </Stack>
                    </form>
                </Card.Section>
            </Card>
        </DashboardLayout>
    );
}

export default PageIndex;
