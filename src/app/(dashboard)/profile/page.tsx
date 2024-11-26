import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getUserProfileAndPayments } from "@/data/user";
import { ExternalLink } from "lucide-react";
import DeleteUserButton from "@/components/auth/delete-user-button";
import ThemeToggle from "@/components/theme-toggle";
import { TypographyH2 } from "@/components/typography/typography-h2";
import { TypographyP } from "@/components/typography/typography-p";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/login");
  }

  const { profile } = await getUserProfileAndPayments(session.user.id);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <TypographyP className="text-muted-foreground">
          Profile not found
        </TypographyP>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-8">
      <TypographyH2>Profile</TypographyH2>
      <Card className="bg-muted/50">
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.image || ""} alt={profile.name || ""} />
              <AvatarFallback>
                {profile.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-2xl font-semibold">{profile.name}</h3>
              <TypographyP className="text-muted-foreground">
                {profile.email}
              </TypographyP>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Preferences</h4>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <h3 className="text-xl font-semibold">Payment History</h3>
        </CardHeader>
        <CardContent>
          {profile.payments && profile.payments.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Invoice</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profile.payments.map((payment) => (
                  <TableRow key={payment.orderId}>
                    <TableCell>
                      {new Date(payment.createdAt || "").toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </TableCell>
                    <TableCell>{payment.totalFormatted}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payment.status === "paid"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : payment.status === "refunded"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                        }`}
                      >
                        {payment.status.charAt(0).toUpperCase() +
                          payment.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {payment.receiptUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-8 w-8"
                        >
                          <a
                            href={payment.receiptUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="View receipt"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-6">
              <TypographyP className="text-muted-foreground">
                No payment history available
              </TypographyP>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <h3 className="text-xl font-semibold">Danger Zone</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <TypographyP className="text-muted-foreground">
              Before deleting your account, you must first delete all your
              analyses and drafts. Once deleted, your account cannot be
              recovered. Please be certain.
            </TypographyP>
            <DeleteUserButton userId={profile.id} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
