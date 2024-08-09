"use client";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";

const UserDetail = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await axios.delete("/api/v1/user");

      if (response.status === 200) {
        await signOut({ redirect: false });
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-2 border-t border-gray-600">
      <h1>Welcome!</h1>
      {status === "loading" ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[200px]" />
          <Skeleton className="h-4 w-[150px]" />
        </div>
      ) : (
        <>
          <h1>{session?.user?.name}</h1>
          <p className="text-sm text-gray-500">{session?.user?.email}</p>
        </>
      )}
      <div className="flex justify-start items-center gap-2 mt-2">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-white text-black text-sm font-bold px-4 py-2 rounded-md hover:opacity-80 duration-300"
        >
          Logout
        </button>
        <AlertDialog>
          <AlertDialogTrigger className="btn_danger">
            Delete Account
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-[300px] sm:max-w-[550px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default UserDetail;
