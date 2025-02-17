"use client";

import { publishPolicy } from "@/app/[locale]/(app)/(dashboard)/policies/[id]/actions/publish-policy";
import { usePolicy } from "@/app/[locale]/(app)/(dashboard)/policies/hooks/usePolicy";
import { Button } from "@bubba/ui/button";
import { Separator } from "@bubba/ui/separator";
import { useAction } from "next-safe-action/hooks";
import type { JSONContent } from "novel";
import { toast } from "sonner";

export function PolicyOverview({ policyId }: { policyId: string }) {
  const { data: policy } = usePolicy({ policyId });
  const { execute, isExecuting } = useAction(
    () => publishPolicy({ id: policyId }),
    {
      onSuccess: () => {
        toast.success("Policy published successfully");
      },
    },
  );

  if (!policy) return null;

  const content = policy.content as JSONContent;

  if (!content) return null;

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col py-4 gap-4">
      <div className="flex justify-end">
        <Button
          variant="secondary"
          className="w-fit"
          onClick={() => execute({ id: policyId })}
        >
          {isExecuting ? "Publishing..." : "Publish"}
        </Button>
      </div>
      <Separator />
      <div className="flex-1">
        <div className="min-h-0 h-auto">
          <div className="relative min-h-[1100px] w-full  mx-auto border border-border bg-background">
            Editor
          </div>
        </div>
      </div>
    </div>
  );
}
