import { render, screen } from "@testing-library/react";
import { UserHeader } from "@/components";
import * as Hooks from "@/hooks";
import { useUIStore } from "@/stores";

jest.mock("@/hooks", () => ({
  useUserFromDB: jest.fn(),
}));

jest.mock("@/stores", () => ({
  useUIStore: jest.fn(),
}));

const mockUser = {
  id: "123",
  firstName: "María",
  lastName: "Gómez",
  avatar: "https://example.com/avatar.jpg",
  city: "CABA",
  state: "Buenos Aires",
  street: "Av. Corrientes",
  email: "maria@example.com",
  phone: "123456789",
};

describe("UserHeader", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows skeleton when user is loading", () => {
    (Hooks.useUserFromDB as jest.Mock).mockReturnValue({ data: null });
    (useUIStore as jest.Mock).mockImplementation((fn) =>
      fn({ hasSeenUserHeader: false, setHasSeenUserHeader: jest.fn() })
    );

    render(<UserHeader />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders user info when loaded", () => {
    (Hooks.useUserFromDB as jest.Mock).mockReturnValue({ data: mockUser });
    (useUIStore as jest.Mock).mockImplementation((fn) =>
      fn({ hasSeenUserHeader: true, setHasSeenUserHeader: jest.fn() })
    );

    render(<UserHeader />);
    expect(screen.getByText(/Hola, María Gómez/i)).toBeInTheDocument();
    expect(screen.getByAltText(/María/i)).toHaveAttribute(
      "src",
      mockUser.avatar
    );
  });
});
