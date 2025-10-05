import AuthWrapper from "@/components/auth/auth-wrapper";
import AdminSidebar from "@/components/layout/admin-sidebar";

export const dynamic = 'force-dynamic';

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
