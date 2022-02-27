import { mount } from "@vue/test-utils";
import RegisterComponent from "@/components/Register.vue";

describe("Tests for RegisterComponent.vue", () => {
  test("Check that component render", async () => {
    const wrapper = mount(RegisterComponent);

    const registerTitle = "Register yourself!";
    expect(wrapper.text()).toMatch(registerTitle);
    expect(wrapper.find("#registerContainer").exists()).toBe(true);
  });

  test("Check that input is correct", async () => {
    const wrapper = mount(RegisterComponent);
    const name = "test";

    const input = wrapper.find("input[type=text]");
    await input.setValue("test");

    expect(input.element.value).toEqual(name);
  });
});
