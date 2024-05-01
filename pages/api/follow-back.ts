// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs/promises";

type Data = {
  success?: string;
  fail?: string;
  results?: any[];
};

type FilesRequestType = {
  followersData: formidable.File[];
  followingData: formidable.File[];
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const form = formidable();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(400).json({ fail: "There was a problem here!" });
      res.end(String(err));

      return;
    }

    const typedFiles = files as unknown as FilesRequestType;

    const followersBuffer = await fs.readFile(
      typedFiles.followersData[0].filepath
    );
    const followersParsed = JSON.parse(followersBuffer.toString());

    const followers = followersParsed.map(
      (follower: { string_list_data: any[] }) => follower.string_list_data[0]
    );

    const followingBuffer = await fs.readFile(
      typedFiles.followingData[0].filepath
    );
    const followingParsed = JSON.parse(
      followingBuffer.toString()
    ).relationships_following;

    const following = followingParsed.map(
      (followingUser: { string_list_data: any[] }) =>
        followingUser.string_list_data[0]
    );

    const followBackUsers = following.filter(
      (followingUser: { value: any }) =>
        !followers.find(
          (follower: { value: any }) => follower.value === followingUser.value
        )
    );

    res.status(200).json({
      success: "The files were successfully processed!",
      results: followBackUsers,
    });

    res.end();
  });
}
