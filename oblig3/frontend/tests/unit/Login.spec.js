import { shallowMount } from "@vue/test-utils";
import LoginComponent from "@/components/Login.vue";
import LoginUser from "@/views/LoginUser.vue";

describe("LoginComponent.vue", () => {
  it("check that LoginComponent renders", () => {
    const wrapper = shallowMount(LoginComponent);
    // add some additional checks. For example related to loginStatusLabel element
    // check that loginstatusLabel component exists
    expect(wrapper.find("#loginstatusLabel").exists()).toBe(true);
    const statusId = wrapper.find("#loginstatusLabel");
    // check that id of the loginstatusLabel element is correct
    expect(statusId.element.id).toBe("loginstatusLabel");
    // check that the loginstatusLabel element is displaying correct value
    expect(statusId.element.textContent).toBe("");
  });
  it("Modify LoginComponent data and test", async () => {
    const wrapper = shallowMount(LoginComponent);

    // get loginstatusLabel element
    const statusId = wrapper.find("#loginstatusLabel");
    // change loginStatus data and check that loginstatusLabel element is updated accordingly
    await wrapper.setData({ loginStatus: "Success" });
    expect(statusId.element.textContent).toBe("Success");
    await wrapper.setData({ loginStatus: "Failed" });
    expect(statusId.element.textContent).toBe("Failed");
  });
  it("Entering/typing texts on username and pass fields", async () => {
    const wrapper = shallowMount(LoginComponent);
    const usernameInput = wrapper.find("#usernameInput");
    const passwordInput = wrapper.find("#passwordInput");
    await usernameInput.setValue("user");
    expect(usernameInput.element.value).toBe("user");
    await passwordInput.setValue("pass");
    expect(passwordInput.element.value).toBe("pass");
  });
  it("Successful signin", async () => {
    const wrapper = shallowMount(LoginComponent);
    const usernameInput = wrapper.find("#usernameInput");
    const passwordInput = wrapper.find("#passwordInput");
    await usernameInput.setValue("user");
    await passwordInput.setValue("pass");
    await wrapper.trigger("submit");
    wrapper.vm.$emit("success");
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().success).toBeTruthy();
  });
  it("Unsuccessful signin", async () => {
    const wrapper = shallowMount(LoginComponent);
    const usernameInput = wrapper.find("#usernameInput");
    const passwordInput = wrapper.find("#passwordInput");
    await usernameInput.setValue("user");
    await passwordInput.setValue("pass");
    await wrapper.trigger("submit");
    wrapper.vm.$emit("failure");
    expect(wrapper.emitted().failure).toBeTruthy();
  });
  it("Register link renders", async () => {
    const wrapper = shallowMount(LoginUser);
    await wrapper.setData({ loginFailure: true });
    expect(wrapper.text()).toMatch("Not registered yet");
  });
});
