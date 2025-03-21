// "use client";

// import { useEffect, useState } from "react";
// import { useGetMeQuery } from "@/redux/api/features/users/userApi";
// import { TUser } from "@/types";
// import { decodeJWT } from "@/utils/verifyToken";
// import Cookies from "js-cookie";

// export const useUser = () => {
//   const [userId, setUserId] = useState<string | null>(null);

//   // Fetch user ID from token
//   useEffect(() => {
//     const fetchUserId = () => {
//       const token = Cookies.get("accessToken");

//       if (token) {
//         const decoded = decodeJWT(token) as any;
//         if (decoded?._id) {
//           setUserId(decoded._id);
//         }
//       }
//     };

//     fetchUserId();

//     const interval = setInterval(fetchUserId, 1000); // Check every 500ms
//     return () => clearInterval(interval); // Cleanup interval
//   }, []);

//   // Fetch user data
//   const {
//     data: userData,
//     isLoading,
//     error,
//     refetch,
//   } = useGetMeQuery(userId!, {
//     skip: !userId,
//   });

//   const user = userData?.data as TUser;

//   useEffect(() => {
//     if (userId) {
//       refetch();
//     }
//   }, [userId, refetch]);

//   return { user, isLoading, error };
// };
"use client";

import { useEffect, useState } from "react";
import { useGetMeQuery } from "@/redux/api/features/users/userApi";
import { TUser } from "@/types";
import { decodeJWT } from "@/utils/verifyToken";
import Cookies from "js-cookie";

export const useUser = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      const decoded = decodeJWT(token);
      if (decoded?._id) {
        setUserId(decoded._id);
      }
    }
  }, []); // Fetch once on mount

  // Fetch user data only if userId exists
  const {
    data: userData,
    isLoading,
    error,
  } = useGetMeQuery(userId!, { skip: !userId });

  return { user: userData?.data as TUser, isLoading, error };
};
