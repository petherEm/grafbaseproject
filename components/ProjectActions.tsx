"use client";

import React, { useState } from "react";

import { deleteProject, fetchToken } from "../lib/actions";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

const ProjectActions = ({ projectId }: { projectId: string }) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProject = async () => {
    setIsDeleting(true);

    const { token } = await fetchToken();

    try {
      await deleteProject(projectId, token);

      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action-btn"
      >
        <Image src="/pencile.svg" width={16} height={16} alt="edit" />
      </Link>

      <button
        type="button"
        onClick={handleDeleteProject}
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
      >
        <Image src="/trash.svg" width={16} height={16} alt="delete" />
      </button>
    </>
  );
};

export default ProjectActions;
