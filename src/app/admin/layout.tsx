import AuthWrapper from "@/components/auth/auth-wrapper";
import AdminSidebar from "@/components/layout/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <AdminSidebar>
        {children}
      </AdminSidebar>
    </AuthWrapper>
  );
}
